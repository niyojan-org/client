"use client";
import React from "react";

export default function TicketCardSelectable({
  ticketName,
  price,
  selected = false,
  soldOut = false,
  onClick,
}) {
  return (
    <div
      onClick={!soldOut ? onClick : undefined}
      className={`
        ticket h-16 w-full
        ${selected ? "border-1 border-primary ring-2 ring-primary/20" : "border border-gray-300"}
        ${soldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.01] hover:shadow-sm"}
      `}
    >
      {/* Main Content */}
      <div className="ticket-content relative w-full flex flex-col items-center">
        <h3 className="ticket-name">{ticketName}</h3>

        <div className="ticket-star bg-linear-to-r from-transparent via-border to-transparent h-[0.05rem] w-full" />

        <p className="ticket-price">₹{price}</p>

        {/* Side text */}
        <div className={`absolute rotate-90 text-sm top-1/2 -left-9 h-full px-2 translate-y-[-50%]  border-t ${selected ? "bg-primary text-muted" : "text-muted-foreground"}`}>orgatick</div>
      </div>

      {soldOut && (
        <span className="sold-out">Sold Out</span>
      )}

      <style jsx>{`
        /* Ticket Wrapper */
        .ticket {
          background: transparent;
          border-radius: 0.5rem;
          min-width: 10rem;
          max-width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .ticket-price {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary);
        }

        /* Side Text */
        .ticket-side-text {
          position: absolute;
          top: 2rem;
          left: 0;
          width: 5rem;
          height: 2rem;
          text-align: center;
          border-top: 0.1rem solid var(--border);
          transform: rotate(90deg) translate(-0.6rem, 2.5rem);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.15rem;
          pointer-events: none;
        }

        /* Sold Out Badge */
        .sold-out {
          position: absolute;
          top: 0.4rem;
          right: 0.4rem;
          background: #ef4444;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
