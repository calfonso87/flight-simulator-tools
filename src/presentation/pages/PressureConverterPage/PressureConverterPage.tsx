import { useState } from "react";
import { View } from "react-native";
import { usePressureConverter } from "@app/hooks/usePressureConverter";
import { CalculatorTemplate } from "@ui/components/templates";
import { AppHeader } from "@ui/components/organisms/AppHeader";
import { PressureConverterForm } from "@ui/components/organisms/PressureConverterForm";
import { PressureResultsPanel } from "@ui/components/organisms/PressureResultsPanel";
import { Text } from "@ui/components/atoms/Text";
import { PermissionGuard } from "@ui/auth/PermissionGuard";
import { PressureConversionInput, PressureUnit } from "@domain/entities/PressureConversion";

export function PressureConverterPage() {
  const { convert, status, result, error } = usePressureConverter();
  const [lastInputUnit, setLastInputUnit] = useState<PressureUnit>("hPa");

  const handleSubmit = (input: PressureConversionInput) => {
    setLastInputUnit(input.inputUnit);
    convert(input);
  };

  return (
    <PermissionGuard
      permission="calculator:use"
      fallback={
        <View className="flex-1 items-center justify-center bg-sky-950 px-6">
          <Text className="text-cockpit-red text-base text-center">
            You do not have permission to use this tool.
          </Text>
        </View>
      }
    >
      <CalculatorTemplate
        header={
          <AppHeader
            title="Pressure Converter"
            subtitle="QNH ↔ BARO"
            showBack
          />
        }
        form={
          <PressureConverterForm
            onSubmit={handleSubmit}
            loading={status === "loading"}
          />
        }
        error={
          error ? (
            <View className="bg-red-950 border border-cockpit-red rounded-xl p-4">
              <Text className="text-cockpit-red text-sm">{error}</Text>
            </View>
          ) : undefined
        }
        results={
          result ? (
            <PressureResultsPanel result={result} inputUnit={lastInputUnit} />
          ) : undefined
        }
      />
    </PermissionGuard>
  );
}
