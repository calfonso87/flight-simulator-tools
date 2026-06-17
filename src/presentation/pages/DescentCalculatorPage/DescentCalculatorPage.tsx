import { View } from "react-native";
import { useDescentCalculator } from "@app/hooks/useDescentCalculator";
import { CalculatorTemplate } from "../../components/templates/CalculatorTemplate";
import { AppHeader } from "../../components/organisms/AppHeader";
import { DescentCalculatorForm } from "../../components/organisms/DescentCalculatorForm";
import { DescentResultsPanel } from "../../components/organisms/DescentResultsPanel";
import { Text } from "../../components/atoms/Text";
import { PermissionGuard } from "../../auth/PermissionGuard";

export function DescentCalculatorPage() {
  const { calculate, status, result, error } = useDescentCalculator();

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
            title="Descent Calculator"
            subtitle="Plan your descent profile"
            showBack
          />
        }
        form={
          <DescentCalculatorForm
            onSubmit={calculate}
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
        results={result ? <DescentResultsPanel result={result} /> : undefined}
      />
    </PermissionGuard>
  );
}
