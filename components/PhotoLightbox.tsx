"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";

// Global enlarged-photo modal — any profile-photo instance across the app
// (sidebar avatar, empty-state trigger, message avatars, the bio artifact's
// embedded photo) opens this same lightbox via openPhotoLightbox().
export function PhotoLightbox() {
  const { content, photoLightboxOpen, closePhotoLightbox } = useAppState();

  return (
    <AnimatePresence>
      {photoLightboxOpen && (
        <motion.div
          key="photo-backdrop"
          onClick={closePhotoLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "grid", placeItems: "center", zIndex: 60 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ position: "relative", maxWidth: "min(420px, 88vw)", maxHeight: "80vh" }}
          >
            <Image
              src={content.photoSrc}
              alt={content.displayName}
              width={640}
              height={800}
              // Deliberately no aspectRatio/objectFit:cover here — small
              // avatars elsewhere crop to a square, but this enlarged view
              // shows the source photo's real, uncropped aspect ratio,
              // just scaled down to fit.
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "min(420px, 88vw)",
                maxHeight: "80vh",
                borderRadius: "var(--r-lg)",
                objectFit: "contain",
                filter: "var(--photo-filter)",
                boxShadow: "0 24px 60px -20px rgba(0,0,0,.5)",
                display: "block",
              }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={closePhotoLightbox}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--panel)",
                color: "var(--text)",
                cursor: "pointer",
                fontSize: "16px",
                display: "grid",
                placeItems: "center",
              }}
            >
              ×
            </motion.button>
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontFamily: "var(--font)",
                fontSize: "11.5px",
                fontStyle: "italic",
                color: "rgba(255,255,255,.7)",
              }}
            >
              {content.uiCopy.photoLightboxCaption}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
