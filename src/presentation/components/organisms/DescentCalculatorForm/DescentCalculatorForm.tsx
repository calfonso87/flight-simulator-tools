import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../molecules/FormField";
import { Button } from "../../atoms/Button";
import {
  descentCalculatorSchema,
  DescentCalculatorFormValues,
} from "./DescentCalculatorForm.schema";
import { DescentProfileInput } from "@domain/entities/DescentProfile";

interface DescentCalculatorFormProps {
  onSubmit: (input: DescentProfileInput) => void;
  loading: boolean;
}

export function DescentCalculatorForm({ onSubmit, loading }: DescentCalculatorFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DescentCalculatorFormValues>({
    resolver: zodResolver(descentCalculatorSchema),
    defaultValues: {
      currentAltitudeFt: "35000",
      targetAltitudeFt: "3000",
      distanceToDestinationNm: "120",
      groundSpeedKts: "420",
    },
  });

  const onValid = (data: DescentCalculatorFormValues) => {
    onSubmit({
      currentAltitudeFt: parseFloat(data.currentAltitudeFt),
      targetAltitudeFt: parseFloat(data.targetAltitudeFt),
      distanceToDestinationNm: parseFloat(data.distanceToDestinationNm),
      groundSpeedKts: parseFloat(data.groundSpeedKts),
    });
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="currentAltitudeFt"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Current Altitude"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            suffix="ft"
            placeholder="e.g. 35000"
            error={errors.currentAltitudeFt?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="targetAltitudeFt"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Target Altitude"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            suffix="ft"
            placeholder="e.g. 3000"
            error={errors.targetAltitudeFt?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="distanceToDestinationNm"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Distance to Destination"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            suffix="nm"
            placeholder="e.g. 120"
            error={errors.distanceToDestinationNm?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="groundSpeedKts"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Ground Speed"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            suffix="kts"
            placeholder="e.g. 420"
            error={errors.groundSpeedKts?.message}
          />
        )}
      />
      <Button
        label="Calculate Descent Profile"
        onPress={handleSubmit(onValid)}
        loading={loading}
        size="lg"
        className="mt-2"
      />
    </View>
  );
}
