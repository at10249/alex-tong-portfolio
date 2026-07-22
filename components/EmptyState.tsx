"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function EmptyState() {
  const [photoOpen, setPhotoOpen] = useState(false);

  return (
    <div
      className="empty-state-pad"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 56px",
      }}
    >
      <button
        onClick={() => setPhotoOpen(true)}
        aria-label="View larger photo of Alex Tong"
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          marginBottom: "22px",
          borderRadius: "18px",
        }}
      >
        <Image
          src="/assets/alex.jpeg"
          alt="Alex Tong"
          width={64}
          height={64}
          priority
          style={{
            width: 64,
            height: 64,
            borderRadius: "18px",
            objectFit: "cover",
            objectPosition: "50% 12%",
            filter: "var(--photo-filter)",
          }}
        />
      </button>
      <AnimatePresence>
        {photoOpen && (
          <motion.div
            key="photo-backdrop"
            onClick={() => setPhotoOpen(false)}
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
              style={{ position: "relative", maxWidth: "min(320px, 84vw)" }}
            >
              <Image
                src="/assets/alex.jpeg"
                alt="Alex Tong"
                width={320}
                height={320}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1",
                  borderRadius: "var(--r-lg)",
                  objectFit: "cover",
                  objectPosition: "50% 12%",
                  filter: "var(--photo-filter)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,.5)",
                  display: "block",
                }}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPhotoOpen(false)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        style={{
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: 1.2,
          letterSpacing: "-.3px",
          color: "var(--text)",
          marginBottom: "12px",
        }}
      >
        Ask me anything about Alex Tong.
      </div>
      <div style={{ fontFamily: "var(--font)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "430px" }}>
        Head of Technical Deployment Strategy at Pentatonic. Strategy brain, operator&rsquo;s hands, AI enthusiast. Pick a
        conversation on the left or ask your own question.
      </div>
    </div>
  );
}
