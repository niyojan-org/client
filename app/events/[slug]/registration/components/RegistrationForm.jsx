import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import TicketCardSelectable from '../../../components/TicketCardSelectable';
import useEventRegistrationStore from '@/store/eventRegistration';
import SingleParticipant from './SingleParticipant';
import GroupMultiStepForm from './group-registration';

export default function RegistrationForm({ registrationForm, formData, groupName, setGroupName, slug }) {
  const { selectTicket, ticket, registerGroup, tickets } = useEventRegistrationStore();
  return (
    <Card className="shadow-md border border-border rounded-xl bg-card text-card-foreground mb-10">
      <CardTitle className="text-center text-2xl font-semibold p-0 ">
        {registrationForm?.eventDetails?.title || 'Register'}
      </CardTitle>

      <CardContent className="space-y-2 w-full p-0">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:wrap-anywhere gap-2 sm:gap-4 w-full px-2 sm:px-6">
          {tickets?.map((t) => (
            <TicketCardSelectable
              key={t.id}
              ticketName={t.type}
              price={t.price}
              soldOut={t.soldOut}
              badge={t.badge}
              selected={ticket && ticket.id === t.id}
              onClick={() => selectTicket(t.id)}
            />
          ))}
        </div>

        {/* INDIVIDUAL FORM */}
        {!ticket || !ticket.isGroupTicket ? (
          <div className="space-y-5 pt-5 px-4 sm:px-6">
            <SingleParticipant allFields={registrationForm} />
          </div>
        ) : (
          <div className="space-y-5 pt-5 px-4 sm:px-6">
            <GroupMultiStepForm
              allFields={registrationForm}
              leaderData={formData}
              groupName={groupName}
              setGroupName={setGroupName}
              onSubmit={(e) => {
                registerGroup(e);
              }}
              slug={slug}
              selectedTicket={ticket}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
