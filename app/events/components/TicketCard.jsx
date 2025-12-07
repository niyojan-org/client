"use client";

import React from "react";

const Ticket = ({ ticketName, price }) => {
  return (
    <div className="ticket h-fit">
      {/* Punch edges */}
      {/* <div className="ticket-edge-top-left" /> */}
      {/* <div className="ticket-edge-top-right" /> */}
      {/* <div className="ticket-edge-bottom-left" /> */}
      {/* <div className="ticket-edge-bottom-right" /> */}
      {/* <div className="ticket-punches" /> */}
      {/* <div className="ticket-punches-right" /> */}

      {/* Inner content */}
      <div className="ticket-inner relative">
        <div className="ticket-headline-container">
          <h3 className="ticket-headline text-xl sm:text-2xl md:text-3xl font-bold tracking-wide font-mono">
            {ticketName}
          </h3>

          <div className="ticket-star" />

          <p className="ticket-admit text-lg sm:text-xl md:text-2xl font-semibold text-primary">
            {price === '0' ? "Free Admission" : `${price} /-`}
          </p>
        </div>

        <div className="font-semibold tracking-widest absolute rotate-90 text-sm top-1/2 -left-18 translate-y-[-50%] translate-x-[50%] px-3 py-1  border-t-2">
          orgatick
        </div>
      </div>

      <style jsx>{`
        .ticket {
          max-width: 100%;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .ticket:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
        }

        .ticket-inner {
          box-shadow: 0 0 0 0.3rem var(--border);
          border-radius: var(--radius);
          margin: 1.5rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          // padding: 0 1rem;
        }
        @media (max-width: 640px) {
          .ticket-inner {
            margin: 1rem 1.5rem;
          }
        }

        .ticket-headline-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }

        .ticket-headline {
          color: var(--foreground);
          line-height: 1.2;
          font-size: 1.4rem;
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

        // /* Punch edges */
        // [class*="ticket-edge"] {
        //   background: var(--color-background);
        //   border: 0.2rem solid var(--border);
        //   border-radius: 50%;
        //   height: 2.5rem;
        //   width: 2.5rem;
        //   position: absolute;
        // }
        // [class*="top"] {
        //   top: -1rem;
        // }
        // [class*="bottom"] {
        //   top: calc(100% - 1.5rem);
        // }
        // [class*="left"] {
        //   left: -1rem;
        // }
        // [class*="right"] {
        //   right: -1rem;
        // }

        // .ticket-punches,
        // .ticket-punches::before,
        // .ticket-punches-right,
        // .ticket-punches-right::before {
        //   background: var(--muted);
        //   border: 0.2rem solid var(--border);
        //   border-radius: 50%;
        //   height: 1.8rem;
        //   width: 1.8rem;
        //   position: absolute;
        // }

        // .ticket-punches {
        //   top: 50%;
        //   left: -1rem;
        //   transform: translateY(-50%);
        // }
        // .ticket-punches::before {
        //   content: "";
        //   position: absolute;
        //   top: -2.1rem;
        //   left: -0.25rem;
        //   height: 1.8rem;
        //   width: 1.8rem;
        //   border: inherit;
        //   border-radius: inherit;
        //   background: inherit;
        // }

        // .ticket-punches-right {
        //   top: 50%;
        //   left: calc(100% - 1rem);
        //   transform: translateY(-50%);
        // }
        // .ticket-punches-right::before {
        //   content: "";
        //   position: absolute;
        //   top: -2.1rem;
        //   left: -0.25rem;
        //   height: 1.8rem;
        //   width: 1.8rem;
        //   border: inherit;
        //   border-radius: inherit;
        //   background: inherit;
        // }
      `}</style>
    </div>
  );
};

export default Ticket;
