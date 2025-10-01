"use client";

import React from "react";

const Ticket = ({ ticketName, price }) => {
  return (
    <div className="ticket">
      <div className="ticket-edge-top-left"></div>
      <div className="ticket-edge-top-right"></div>
      <div className="ticket-edge-bottom-left"></div>
      <div className="ticket-edge-bottom-right"></div>
      <div className="ticket-punches"></div>
      <div className="ticket-punches-right"></div>

      <div className="ticket-inner">
        <div className="ticket-headline-container">
          <div className="ticket-headline">{ticketName}</div>
          <div className="ticket-star">
            <div className="fa fa-star-o"></div>
          </div>
          <div className="ticket-admit">
            <span>{price}</span>
          </div>
        </div>

        <div className="ticket-side-text">Orgatic</div>
      </div>

      <style jsx>{`
        @import '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css';

        .ticket {
          background: var(--card); /* outer ticket background */
          box-shadow: inset 0 0 0 0.25rem var(--border);
          height: 12.5rem;
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 30rem;
          margin: 0 auto;
          border-radius: var(--radius);
        }

        /* Inner ticket: use a light background for better contrast */
        .ticket-inner {
          box-shadow: 0 0 0 0.5rem var(--border);
          border-radius: var(--radius);
          height: 8.5rem;
          margin: 2rem 2.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          padding-right: 3rem;
          background: var(--ticket-inner-bg, #fff); /* fallback white */
        }

        .ticket-headline-container {
          display: flex;
          flex-direction: column;
        }

        .ticket-headline {
          font-size: 1.5rem;
          font-weight: bold;
          padding-bottom: 0.25rem;
          text-align: right;
          color: var(--foreground);
        }

        .ticket-star {
          background: linear-gradient(
            to right,
            transparent 25%,
            var(--border) 50%,
            transparent 75%
          );
          background-position: 0 50%;
          background-repeat: no-repeat;
          background-size: 100% 1px;
          height: 1.2rem;
          width: 100%;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .ticket-star .fa-star-o {
          background: var(--ticket-inner-bg, #fff);
          padding: 0 0.25rem;
          color: var(--primary);
        }

        .ticket-admit {
          font-size: 1.5rem;
          margin-top: 0.25rem;
          text-align: center;
          font-weight: bold;
          color: var(--primary);
        }

        .ticket-side-text {
          border-top: 0.25rem solid var(--border);
          color: var(--muted-foreground);
          font-size: 1rem;
          font-weight: bold;
          left: 0;
          letter-spacing: 0.25rem;
          height: 5rem;
          padding: 1.25rem;
          position: absolute;
          text-align: center;
          top: 2.5rem;
          transform: rotate(90deg) translate(-0.75rem, 3rem);
          width: 9rem;
        }

        [class*="ticket-edge"] {
          background: var(--muted);
          border: 0.25rem solid var(--border);
          border-radius: 50%;
          height: 3rem;
          position: absolute;
          width: 3rem;
        }

        [class*="top"] {
          top: -1rem;
        }

        [class*="bottom"] {
          top: calc(11.5rem);
        }

        [class*=left] {
          left: -1rem;
        }

        [class*=right] {
          right: -1rem;
        }

        .ticket-punches,
        .ticket-punches::before,
        .ticket-punches-right::before,
        .ticket-punches::after,
        .ticket-punches-right::after,
        .ticket-punches-right {
          background: var(--muted);
          border: 0.25rem solid var(--border);
          border-radius: 50%;
          height: 2rem;
          left: -1rem;
          position: absolute;
          top: 6rem;
          width: 2rem;
        }

        .ticket-punches::before,
        .ticket-punches-right::before,
        .ticket-punches::after,
        .ticket-punches-right::after {
          content: '';
          display: block;
          left: -0.25rem;
          top: 0;
        }

        .ticket-punches::before,
        .ticket-punches-right::before {
          top: -2.25rem;
        }

        .ticket-punches::after,
        .ticket-punches-right::after {
          top: 1.75rem;
        }

        .ticket-punches-right {
          left: calc(100% - 1rem);
        }
      `}</style>
    </div>
  );
};

export default Ticket;
