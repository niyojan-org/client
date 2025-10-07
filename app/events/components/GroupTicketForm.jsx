"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DynamicField from "./DynamicField";

const GroupTicketForm = ({ allFields = [], groupSettings = {}, groupMembers = [], setGroupMembers }) => {
  const { minParticipants = 1, maxParticipants = minParticipants } = groupSettings;

  // initialize members
  useEffect(() => {
    const desired = Math.max(0, minParticipants - 1);
    if (groupMembers.length === 0 && desired > 0) {
      setGroupMembers(Array.from({ length: desired }, () => ({})));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minParticipants]);

  const addMember = () => {
    if (groupMembers.length + 1 >= maxParticipants) return;
    setGroupMembers((prev) => [...prev, {}]);
  };

  const removeMember = (index) => {
    setGroupMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, name, value) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const canAdd = groupMembers.length + 1 < maxParticipants;
  const total = 1 + groupMembers.length;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Group Members</h3>
          <p className="text-sm text-gray-500">
            Fill details for remaining {minParticipants - 1}+ members
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Participants: <span className="font-medium">{total}</span> / {maxParticipants}
        </div>
      </div>

      {groupMembers.map((member, idx) => (
        <div key={idx} className="border rounded-md p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Member {idx + 2}</h4>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => removeMember(idx)}
              disabled={groupMembers.length <= Math.max(0, minParticipants - 1)}
            >
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allFields.map((f) => (
              <DynamicField
                key={`${idx}-${f.name}`}
                field={f}
                value={member?.[f.name] || ""}
                onChange={(name, val) => handleMemberChange(idx, name, val)}
              />
            ))}
          </div>
        </div>
      ))}

      <Button type="button" onClick={addMember} disabled={!canAdd}>
        + Add Member
      </Button>
      {!canAdd && <p className="text-sm text-gray-500">Maximum participants reached</p>}
    </div>
  );
};

export default GroupTicketForm;
