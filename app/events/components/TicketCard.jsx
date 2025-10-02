"use client";

import React from "react";

const Ticket = ({ ticketName, price }) => {
  return (
    <div className="ticket">
      {/* Punch edges */}
      <div className="ticket-edge-top-left" />
      <div className="ticket-edge-top-right" />
      <div className="ticket-edge-bottom-left" />
      <div className="ticket-edge-bottom-right" />
      <div className="ticket-punches" />
      <div className="ticket-punches-right" />

      {/* Inner content */}
      <div className="ticket-inner">
        <div className="ticket-headline-container">
          <h3 className="ticket-headline text-2xl md:text-3xl font-bold tracking-wide font-mono">
            {ticketName}
          </h3>

          <div className="ticket-star" />

          <p className="ticket-admit text-xl md:text-2xl font-semibold text-primary">
            {price} /-
          </p>
        </div>

        <div className="ticket-side-text font-semibold tracking-widest">
          ORGATIC
        </div>
      </div>

      <style jsx>{`
        @import "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css";

        .ticket {
          background: var(--card);
          border-radius: var(--radius);
          height: 12.5rem;
          max-width: 25rem;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ticket:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .ticket-inner {
          background: var(--card-foreground);
          background: var(--ticket-inner-bg, #fff);
          box-shadow: 0 0 0 0.35rem var(--border);
          border-radius: var(--radius);
          height: 8.5rem;
          margin: 2rem 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 0 1rem;
        }

        .ticket-headline-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .ticket-headline {
          color: var(--foreground);
          line-height: 1.2;
        }

        .ticket-star {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--border),
            transparent
          );
          margin: 0.3rem 0;
        }

        .ticket-admit {
          margin-top: 0.2rem;
        }

        .ticket-side-text {
          position: absolute;
          top: 2.5rem;
          left: 0;
          width: 9rem;
          height: 5rem;
          padding: 1.25rem 0;
          text-align: center;
          border-top: 0.25rem solid var(--border);
          color: var(--muted-foreground);
          transform: rotate(90deg) translate(-0.8rem, 3rem);
          font-size: 0.9rem;
          letter-spacing: 0.25rem;
        }

        /* Punch edges */
        [class*="ticket-edge"] {
          background: var(--color-background);
          border: 0.25rem solid var(--border);
          border-radius: 50%;
          height: 3rem;
          width: 3rem;
          position: absolute;
        }
        [class*="top"] {
          top: -1rem;
        }
        [class*="bottom"] {
          top: calc(11.5rem);
        }
        [class*="left"] {
          left: -1rem;
        }
        [class*="right"] {
          right: -1rem;
        }

        .ticket-punches,
        .ticket-punches::before,
        .ticket-punches-right,
        .ticket-punches-right::before {
          background: var(--muted);
          border: 0.25rem solid var(--border);
          border-radius: 50%;
          height: 2rem;
          width: 2rem;
          position: absolute;
        }

        .ticket-punches {
          top: 6rem;
          left: -1rem;
        }
        .ticket-punches::before {
          content: "";
          position: absolute;
          top: -2.25rem;
          left: -0.25rem;
          height: 2rem;
          width: 2rem;
          border: inherit;
          border-radius: inherit;
          background: inherit;
        }

        .ticket-punches-right {
          top: 6rem;
          left: calc(100% - 1rem);
        }
        .ticket-punches-right::before {
          content: "";
          position: absolute;
          top: -2.25rem;
          left: -0.25rem;
          height: 2rem;
          width: 2rem;
          border: inherit;
          border-radius: inherit;
          background: inherit;
        }
      `}</style>
    </div>
  );
};

export default Ticket;
