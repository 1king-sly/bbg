import { differenceInWeeks } from "date-fns";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  name: string;
  email: string;
  phone: string;
  image: string;
  hasChild: boolean;
  isPregnant: boolean;
  isMenstruating: boolean;
  pregnancyDate?: string;
  lastPeriodDate?: string;
  cycleDays?: number;
  childBirthDate?: string;
  summary: string | null;
  detailed_analysis: string | null;
}
export default function useUser() {
  const [profile, setProfile] = useState<User>({
    name: "",
    email: "",
    phone: "",
    image: "",
    isPregnant: false,
    isMenstruating: false,
    hasChild: false,
    summary: "",
    detailed_analysis: "",
  });
  const [progress, setProgress] = useState(0);

  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState("normal");
  const [lastPeriod, setLastPeriod] = useState<Date>();
  const [currentDay, setCurrentDay] = useState(0);
  const [session, setSession] = useState(false);

  const [role, setRole] = useState("");
  const [pregnancyWeeks, setPregnancyWeeks] = useState<number | null>(null);
  const [childWeeks, setChildWeeks] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const fetchUser = async () => {
    const access_token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (
          profile.summary?.trim.length == 0 ||
          profile.detailed_analysis?.trim.length == 0
        ) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const handleProfileSubmit = async (updatedProfile: User) => {
    const access_token = localStorage.getItem("accessToken");
    const payload = {
      name: updatedProfile.name,
      email: updatedProfile.email,
      phone: updatedProfile.phone,
      cycleDays: updatedProfile.cycleDays,
      isPregnant: updatedProfile.isPregnant,
      isMenstruating: updatedProfile.isMenstruating,
      lastPeriodDate: updatedProfile.lastPeriodDate,
    };

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        return { success: true, data };
      } else {
        return { success: false, error: "Failed to update profile" };
      }
    } catch (error) {
      console.error("Failed to update user", error);
      return { success: false, error: "Failed to update profile" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-blue-500";
      case "fertile":
        return "bg-green-500";
      case "menstruating":
        return "bg-red-500";
      case "warning":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchSession = async () => {
    const access_token = localStorage.getItem("accessToken");
    const accessRole = localStorage.getItem("role");

    if (access_token && accessRole !== "" && accessRole !== null) {
      setRole(accessRole);
      setSession(true);
      if (access_token && accessRole) {
        setRole(accessRole);

        if (accessRole !== "USER") {
        } else {
          setIsVerified(true);
        }
      }
    }
  };

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetchSession();
    fetchUser();
  }, []);

  useEffect(() => {
    const lastTrackerPeriodDate = profile?.lastPeriodDate
      ? new Date(profile.lastPeriodDate)
      : new Date();
    setLastPeriod(lastTrackerPeriodDate);

    const day = Math.ceil(
      (new Date().getTime() - lastTrackerPeriodDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    setCurrentDay(day);

    if (day >= 1 && day <= 5) {
      setStatus("menstruating");
    } else if (day >= 12 && day <= 16) {
      setStatus("fertile");
    } else if (day >= 24) {
      setStatus("warning");
    } else {
      setStatus("normal");
    }

    if (profile?.isPregnant && profile.pregnancyDate) {
      const weeks = differenceInWeeks(
        new Date(),
        new Date(profile.pregnancyDate)
      );
      setPregnancyWeeks(weeks);
    }

    if (profile?.hasChild && profile.childBirthDate) {
      const weeks = differenceInWeeks(
        new Date(),
        new Date(profile.childBirthDate)
      );
      setChildWeeks(weeks);
    }

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [
    profile?.childBirthDate,
    profile?.cycleDays,
    profile?.hasChild,
    profile?.isPregnant,
    profile?.lastPeriodDate,
    profile?.pregnancyDate,
  ]);

  return {
    progress,
    setProgress,
    status,
    setStatus,
    lastPeriod,
    setLastPeriod,
    currentDay,
    setCurrentDay,
    profile,
    setProfile,
    session,
    setSession,
    role,
    setRole,
    pregnancyWeeks,
    setPregnancyWeeks,
    childWeeks,
    setChildWeeks,
    isVerified,
    setIsVerified,
    fetchUser,
    handleProfileSubmit,
    getStatusColor,
    fetchSession,
    activeTab,
    setActiveTab,
  };
}
