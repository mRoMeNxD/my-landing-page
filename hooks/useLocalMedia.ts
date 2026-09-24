"use client";

import { useEffect, useState, useCallback } from "react";
import { ProfileConfig, defaultProfile } from "@/lib/profile";
import {
  getMediaUrl,
  saveMediaFile,
  clearMediaRecord,
  saveSettingsToLocal,
  loadSettingsFromLocal,
  clearAllLocalCustomizations,
} from "@/lib/storage";

export function useLocalProfile() {
  const [profile, setProfile] = useState<ProfileConfig>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBackgroundSrc, setActiveBackgroundSrc] = useState<string>(
    defaultProfile.background.src
  );
  const [activeCursorSrc, setActiveCursorSrc] = useState<string>(
    defaultProfile.cursor.src
  );
  const [activeProfileImg, setActiveProfileImg] = useState<string>(
    defaultProfile.profileImage
  );

  // Initialize from storage
  useEffect(() => {
    async function loadData() {
      const savedSettings = loadSettingsFromLocal();
      const customBgUrl = await getMediaUrl("custom_background");
      const customCursorUrl = await getMediaUrl("custom_cursor");
      const customProfileUrl = await getMediaUrl("custom_profile");

      const merged: ProfileConfig = {
        ...defaultProfile,
        ...(savedSettings || {}),
        background: {
          ...defaultProfile.background,
          ...(savedSettings?.background || {}),
        },
        tvGrid: {
          ...defaultProfile.tvGrid,
          ...(savedSettings?.tvGrid || {}),
        },
        cursor: {
          ...defaultProfile.cursor,
          ...(savedSettings?.cursor || {}),
        },
      };

      if (customBgUrl) {
        merged.background.src = customBgUrl;
        setActiveBackgroundSrc(customBgUrl);
      } else if (savedSettings?.background?.src) {
        setActiveBackgroundSrc(savedSettings.background.src);
      }

      if (customCursorUrl) {
        merged.cursor.src = customCursorUrl;
        setActiveCursorSrc(customCursorUrl);
      } else if (savedSettings?.cursor?.src) {
        setActiveCursorSrc(savedSettings.cursor.src);
      }

      if (customProfileUrl) {
        merged.profileImage = customProfileUrl;
        setActiveProfileImg(customProfileUrl);
      } else if (savedSettings?.profileImage) {
        setActiveProfileImg(savedSettings.profileImage);
      }

      setProfile(merged);
      setIsLoaded(true);
    }

    loadData();
  }, []);

  // Update a portion of settings
  const updateProfile = useCallback(
    (newSettings: Partial<ProfileConfig>) => {
      setProfile((prev) => {
        const updated = {
          ...prev,
          ...newSettings,
          background: {
            ...prev.background,
            ...(newSettings.background || {}),
          },
          tvGrid: {
            ...prev.tvGrid,
            ...(newSettings.tvGrid || {}),
          },
          cursor: {
            ...prev.cursor,
            ...(newSettings.cursor || {}),
          },
        };
        saveSettingsToLocal(updated);
        return updated;
      });
    },
    []
  );

  // Upload custom background (Image or Video)
  const uploadBackground = useCallback(
    async (file: File) => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (!isVideo && !isImage) {
        throw new Error("Unsupported format. Please upload an image (JPG, PNG, WEBP) or video (MP4, WEBM).");
      }

      const maxSize = isVideo ? 20 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(
          `File is too large. Max size is ${isVideo ? "20MB" : "10MB"}. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`
        );
      }

      const blobUrl = await saveMediaFile("custom_background", file);
      setActiveBackgroundSrc(blobUrl);
      updateProfile({
        background: {
          ...profile.background,
          type: isVideo ? "video" : "image",
          src: blobUrl,
        },
      });
      return blobUrl;
    },
    [profile.background, updateProfile]
  );

  // Upload custom cursor
  const uploadCursor = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/") && file.type !== "image/svg+xml") {
        throw new Error("Unsupported cursor format. Please upload an image (JPG, PNG, WEBP, SVG).");
      }
      if (file.size > 500 * 1024) {
        throw new Error(
          `Cursor file is too large. Max size is 500KB. Your file is ${(file.size / 1024).toFixed(1)}KB.`
        );
      }

      const blobUrl = await saveMediaFile("custom_cursor", file);
      setActiveCursorSrc(blobUrl);
      updateProfile({
        cursor: {
          ...profile.cursor,
          src: blobUrl,
        },
      });
      return blobUrl;
    },
    [profile.cursor, updateProfile]
  );

  // Reset to default
  const resetToDefaults = useCallback(async () => {
    clearAllLocalCustomizations();
    setProfile(defaultProfile);
    setActiveBackgroundSrc(defaultProfile.background.src);
    setActiveCursorSrc(defaultProfile.cursor.src);
    setActiveProfileImg(defaultProfile.profileImage);
  }, []);

  return {
    profile,
    isLoaded,
    activeBackgroundSrc,
    activeCursorSrc,
    activeProfileImg,
    updateProfile,
    uploadBackground,
    uploadCursor,
    resetToDefaults,
  };
}
