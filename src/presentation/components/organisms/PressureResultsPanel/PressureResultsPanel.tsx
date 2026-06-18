import { View } from "react-native";
import { Text } from "../../atoms/Text";
import { ResultCard } from "../../molecules/ResultCard";
import { PressureConversionResult } from "@domain/entities/PressureConversion";
import { PressureUnit } from "@domain/entities/PressureConversion";

interface PressureResultsPanelProps {
  result: PressureConversionResult;
  inputUnit: PressureUnit;
}

export function PressureResultsPanel({ result, inputUnit }: PressureResultsPanelProps) {
  const deltaHpaSign = result.deltaFromStandardHpa >= 0 ? "+" : "";
  const deltaInHgSign = result.deltaFromStandardInHg >= 0 ? "+" : "";

  return (
    <View className="gap-3">
      <Text className="text-cockpit-amber text-xs uppercase tracking-widest">
        Conversion Results
      </Text>
      <View className="flex-row gap-3">
        <ResultCard
          label="QNH"
          value={result.qnhHpa.toFixed(2)}
          unit="hPa"
          highlight={inputUnit === "inHg"}
        />
        <ResultCard
          label="BARO"
          value={result.baroInHg.toFixed(2)}
          unit="inHg"
          highlight={inputUnit === "hPa"}
        />
      </View>
      <View className="flex-row gap-3">
        <ResultCard
          label="Δ Std (hPa)"
          value={`${deltaHpaSign}${result.deltaFromStandardHpa.toFixed(2)}`}
          unit="hPa"
        />
        <ResultCard
          label="Δ Std (inHg)"
          value={`${deltaInHgSign}${result.deltaFromStandardInHg.toFixed(2)}`}
          unit="inHg"
        />
      </View>
    </View>
  );
}
