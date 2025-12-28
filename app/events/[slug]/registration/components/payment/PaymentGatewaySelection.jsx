import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconCreditCard, IconShieldCheck, IconCircleCheck } from "@tabler/icons-react";

const PaymentGatewaySelection = ({ gateways, selectedGateway, onSelectGateway }) => {
  return (
    <Card className="border-2 h-full">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <IconCreditCard className="w-5 h-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
        {gateways.map((gateway) => {
          const GatewayIcon = gateway.icon;
          return (
            <div
              key={gateway.id}
              onClick={() => gateway.available && onSelectGateway(gateway.id)}
              className={`relative border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                !gateway.available
                  ? "opacity-50 cursor-not-allowed bg-muted/50"
                  : selectedGateway === gateway.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
            >
              {!gateway.available && (
                <Badge variant="destructive" className="absolute top-2 right-2 text-xs px-2 py-0">
                  Unavailable
                </Badge>
              )}

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <GatewayIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                    {gateway.name}
                    {selectedGateway === gateway.id && (
                      <IconCircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {gateway.description}
                  </p>

                  {gateway.available && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {gateway.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <Alert className="border-blue-200 bg-blue-50/50">
          <IconShieldCheck className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 text-xs sm:text-sm">
            Secured with 256-bit SSL encryption
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

const PaymentGatewaySelectionMobile = ({ gateways, selectedGateway, onSelectGateway }) => {
  return (
    <div className="sm:hidden space-y-3 px-2">
      {gateways.map((gateway) => {
        const GatewayIcon = gateway.icon;
        return (
          <div
            key={gateway.id}
            onClick={() => gateway.available && onSelectGateway(gateway.id)}
            className={`relative border-2 rounded-lg p-3 transition-all cursor-pointer ${
              !gateway.available
                ? "opacity-50 cursor-not-allowed bg-muted/50"
                : selectedGateway === gateway.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            }`}
          >
            {!gateway.available && (
              <Badge variant="destructive" className="absolute top-2 right-2 text-xs px-2 py-0">
                Unavailable
              </Badge>
            )}

            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <GatewayIcon className="w-8 h-8 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    {gateway.name}
                    {selectedGateway === gateway.id && (
                      <IconCircleCheck className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </h3>
                  {gateway.available && (
                    <div className="flex flex-wrap gap-1.5 ">
                      {gateway.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{gateway.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { PaymentGatewaySelectionMobile };
export default PaymentGatewaySelection;
