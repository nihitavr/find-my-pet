"use client";

import { BellOff, BellRing } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/lib/trpc/react";
import { toast } from "../ui/use-toast";

export default function AlertsSwitch({
  petId,
  petName,
  isAlertsEnabled,
  className,
}: {
  petId: string;
  petName: string;
  isAlertsEnabled: boolean;
  className?: string;
}) {
  const [isEnabled, setIsEnabled] = useState(isAlertsEnabled);
  const petAlerts = api.pet.updateAlertsEnabled.useMutation();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Label htmlFor="notification-switch">
        {isEnabled ? (
          <BellRing className="h-4 w-4 text-slate-900" />
        ) : (
          <BellOff className="h-4 w-4 text-slate-900" />
        )}
      </Label>
      <Switch
        checked={isEnabled}
        id="notification-switch"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsEnabled((isEnabled: boolean) => !isEnabled);

          petAlerts.mutate({
            petId,
            alertsEnabled: isEnabled,
          });

          toast({
            title: "Alerts",
            description: !isEnabled ? (
              <span>
                Email Alerts are now{" "}
                <span className="font-semibold">enabled</span> for{" "}
                <span className="font-semibold">{petName}</span>. You will get
                an email when ever a pet tag is scanned.
              </span>
            ) : (
              <span>
                Email Alerts are now disabled for{" "}
                <span className="font-semibold">{petName}</span>.
              </span>
            ),
            timeout: 5000,
          });
        }}
        // className="w-10"
      />
    </div>
  );
}
