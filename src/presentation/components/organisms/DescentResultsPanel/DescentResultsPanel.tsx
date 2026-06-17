import { View } from "react-native";
import { Text } from "../../atoms/Text";
import { ResultCard } from "../../molecules/ResultCard";
import { DescentProfileResult } from "@domain/entities/DescentProfile";

interface DescentResultsPanelProps {
  result: DescentProfileResult;
}

export function DescentResultsPanel({ result }: DescentResultsPanelProps) {
  return (
    <View className="gap-3">
      <Text className="text-cockpit-amber text-xs uppercase tracking-widest">
        Descent Profile Results
      </Text>
      <View className="flex-row gap-3">
        <ResultCard
          label="Descent Rate"
          value={result.requiredDescentRateFpm.toLocaleString()}
          unit="fpm"
          highlight
        />
        <ResultCard
          label="Descent Angle"
          value={result.descentAngleDegrees}
          unit="°"
        />
      </View>
      <View className="flex-row gap-3">
        <ResultCard
          label="Time to Descend"
          value={result.timeToDescendMinutes}
          unit="min"
        />
        <ResultCard
          label="Top of Descent"
          value={result.topOfDescentNm}
          unit="nm out"
        />
      </View>
    </View>
  );
}
