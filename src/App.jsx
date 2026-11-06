import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DaySelector from './components/DaySelector';
import MapView from './components/MapView';
import TimelineView from './components/TimelineView';
import PinDetailModal from './components/PinDetailModal';
import CheckInPromptModal from './components/CheckInPromptModal';
import ResetConfirmModal from './components/ResetConfirmModal';
import { tripDays, tripSpots } from './data/tripData';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedDay, setSelectedDay] = useState('1');
  const [focusedSpot, setFocusedSpot] = useState(null);
  const [detailSpot, setDetailSpot] = useState(null);
  const [checkInDialog, setCheckInDialog] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Check-in state saved in localStorage
  const [checkedSpots, setCheckedSpots] = useState(() => {
    try {
      const saved = localStorage.getItem('kansai_trip_checked_spots');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const commitCheckIn = (spotIdsToAdd) => {
    setCheckedSpots((prev) => {
      const next = Array.from(new Set([...prev, ...spotIdsToAdd]));
      try {
        localStorage.setItem('kansai_trip_checked_spots', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    if (window.confetti) {
      window.confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleToggleCheckIn = (spotId) => {
    const targetSpot = tripSpots.find((s) => s.id === spotId);
    if (!targetSpot) return;

    // If already checked in, toggle off immediately
    if (checkedSpots.includes(spotId)) {
      setCheckedSpots((prev) => {
        const next = prev.filter((id) => id !== spotId);
        try {
          localStorage.setItem('kansai_trip_checked_spots', JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
        return next;
      });
      return;
    }

    // Checking in: check if prior spots in the same day are missing check-in
    const daySpots = tripSpots.filter((s) => s.day === targetSpot.day);
    const targetIdx = daySpots.findIndex((s) => s.id === targetSpot.id);
    const priorSpots = daySpots.slice(0, targetIdx);
    const missingPrior = priorSpots.filter((s) => !checkedSpots.includes(s.id));

    if (missingPrior.length === 0) {
      // Normal check in (no prior spots missing)
      commitCheckIn([spotId]);
    } else {
      // Prompt user according to single vs multiple missing prior spots
      setCheckInDialog({
        targetSpot,
        missingPrior
      });
    }
  };

  const handleCheckInTargetOnly = (targetSpot) => {
    commitCheckIn([targetSpot.id]);
    setCheckInDialog(null);
  };

  const handleCheckInAllPriorAndTarget = (targetSpot, missingPrior) => {
    const allIds = [...missingPrior.map((s) => s.id), targetSpot.id];
    commitCheckIn(allIds);
    setCheckInDialog(null);
  };

  // Spots for current active day (or all)
  const currentDaySpots = useMemo(() => {
    return tripSpots.filter(
      (s) => selectedDay === 'all' || s.day === Number(selectedDay)
    );
  }, [selectedDay]);

  // Handle modal next/prev navigation
  const detailSpotIndex = currentDaySpots.findIndex((s) => s.id === detailSpot?.id);
  const hasPrev = detailSpotIndex > 0;
  const hasNext = detailSpotIndex >= 0 && detailSpotIndex < currentDaySpots.length - 1;

  const handleNavigatePrev = () => {
    if (hasPrev) {
      const prev = currentDaySpots[detailSpotIndex - 1];
      setDetailSpot(prev);
      setFocusedSpot(prev);
    }
  };

  const handleNavigateNext = () => {
    if (hasNext) {
      const next = currentDaySpots[detailSpotIndex + 1];
      setDetailSpot(next);
      setFocusedSpot(next);
    }
  };

  const handleOpenMapWithSpot = (spot) => {
    setSelectedDay(String(spot.day));
    setFocusedSpot(spot);
    setActiveTab('map');
  };

  const handleResetCheckIns = () => {
    if (checkedSpots.length > 0) {
      setShowResetConfirm(true);
    }
  };

  const handleConfirmReset = () => {
    setCheckedSpots([]);
    try {
      localStorage.removeItem('kansai_trip_checked_spots');
    } catch (e) {
      console.error(e);
    }
    setShowResetConfirm(false);
  };

  return (
    <div className={`clean-app-container tab-${activeTab}`}>
      {/* Clean Top Header (Title, Check-in Reset & Switcher) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        checkedSpotsCount={checkedSpots.length}
        onResetCheckIns={handleResetCheckIns}
      />

      {/* Clean Day Selector (Horizontal Pill Scroll, NEVER overlaps!) */}
      <DaySelector
        selectedDay={selectedDay}
        onSelectDay={(day) => {
          setSelectedDay(day);
          setFocusedSpot(null);
          setDetailSpot(null);
        }}
      />

      {/* Main Content Area */}
      <main className="clean-main-viewport">
        {activeTab === 'map' && (
          <MapView
            spots={tripSpots}
            selectedDay={selectedDay}
            focusedSpot={focusedSpot}
            checkedSpots={checkedSpots}
            onToggleCheckIn={handleToggleCheckIn}
            onFocusSpot={(spot) => setFocusedSpot(spot)}
            onOpenDetail={(spot) => setDetailSpot(spot)}
          />
        )}

        {activeTab === 'timeline' && (
          <div className="clean-timeline-scroll">
            <TimelineView
              spots={tripSpots}
              selectedDay={selectedDay}
              checkedSpots={checkedSpots}
              onToggleCheckIn={handleToggleCheckIn}
              onSelectSpot={(spot) => setDetailSpot(spot)}
              onOpenMapWithSpot={handleOpenMapWithSpot}
            />
          </div>
        )}
      </main>

      {/* Pin Detail Modal / Bottom Sheet - ONLY opens when user explicitly clicks detail */}
      <PinDetailModal
        spot={detailSpot}
        checkedSpots={checkedSpots}
        onToggleCheckIn={handleToggleCheckIn}
        onClose={() => setDetailSpot(null)}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      {/* Check-in Prior Spots Warning & Auto-Check-in Dialog */}
      <CheckInPromptModal
        dialogData={checkInDialog}
        onClose={() => setCheckInDialog(null)}
        onCheckInTargetOnly={handleCheckInTargetOnly}
        onCheckInAllPriorAndTarget={handleCheckInAllPriorAndTarget}
      />

      {/* Reset Check-in Confirmation Modal (Cute In-App Dialog, NO browser popup) */}
      <ResetConfirmModal
        isOpen={showResetConfirm}
        checkedCount={checkedSpots.length}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
