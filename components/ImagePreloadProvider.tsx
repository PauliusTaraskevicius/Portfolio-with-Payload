"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

interface ImagePreloadContextType {
  areImagesReady: boolean;
  registerImages: (urls: string[]) => void;
  markImageLoaded: (url: string) => void;
  loadProgress: number;
}

const ImagePreloadContext = createContext<ImagePreloadContextType | null>(null);

export const useImagePreload = () => {
  const context = useContext(ImagePreloadContext);
  if (!context) {
    throw new Error(
      "useImagePreload must be used within an ImagePreloadProvider",
    );
  }
  return context;
};

interface ImagePreloadProviderProps {
  children: ReactNode;
  minLoadTime?: number; // Minimum time to show loading animation (ms)
  maxWaitTime?: number; // Maximum time to wait for images (ms)
}

export const ImagePreloadProvider = ({
  children,
  minLoadTime = 1600,
  maxWaitTime = 8000,
}: ImagePreloadProviderProps) => {
  const [registeredImages, setRegisteredImages] = useState<Set<string>>(
    new Set(),
  );
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [forceReady, setForceReady] = useState(false);

  // Start min time and max wait timers on mount
  useEffect(() => {
    // Min time timer - ensures animation plays for minimum duration
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minLoadTime);

    // Max wait timer - fallback if images take too long
    const maxTimer = setTimeout(() => {
      setForceReady(true);
    }, maxWaitTime);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [minLoadTime, maxWaitTime]);

  const registerImages = useCallback((urls: string[]) => {
    setRegisteredImages((prev) => {
      const next = new Set(prev);
      urls.forEach((url) => {
        if (url) next.add(url);
      });
      return next;
    });

    // Preload images
    urls.forEach((url) => {
      if (!url) return;

      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(url);
          return next;
        });
      };
      img.onerror = () => {
        // On error, still mark as "loaded" to prevent blocking
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(url);
          return next;
        });
      };
      img.src = url;
    });
  }, []);

  const markImageLoaded = useCallback((url: string) => {
    setLoadedImages((prev) => {
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  }, []);

  const loadProgress = useMemo(() => {
    if (registeredImages.size === 0) return 100;
    return (loadedImages.size / registeredImages.size) * 100;
  }, [registeredImages.size, loadedImages.size]);

  const allImagesLoaded = useMemo(() => {
    if (registeredImages.size === 0) return true;
    return loadedImages.size >= registeredImages.size;
  }, [registeredImages.size, loadedImages.size]);

  const areImagesReady = useMemo(() => {
    // Force ready after max wait time
    if (forceReady) return true;
    // Ready when both min time elapsed AND all images loaded (or no images registered)
    return minTimeElapsed && allImagesLoaded;
  }, [forceReady, minTimeElapsed, allImagesLoaded]);

  const value = useMemo(
    () => ({
      areImagesReady,
      registerImages,
      markImageLoaded,
      loadProgress,
    }),
    [areImagesReady, registerImages, markImageLoaded, loadProgress],
  );

  return (
    <ImagePreloadContext.Provider value={value}>
      {children}
    </ImagePreloadContext.Provider>
  );
};
