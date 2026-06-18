import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@ui/components/molecules";
import { Button } from "@ui/components/atoms/Button";
import { Text } from "@ui/components/atoms/Text";
import {
  pressureConverterSchema,
  PressureConverterFormValues,
} from "./PressureConverterForm.schema";
import { PressureConversionInput } from "@domain/entities/PressureConversion";

interface PressureConverterFormProps {
  onSubmit: (input: PressureConversionInput) => void;
  loading: boolean;
}

export function PressureConverterForm({ onSubmit, loading }: PressureConverterFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PressureConverterFormValues>({
    resolver: zodResolver(pressureConverterSchema),
    defaultValues: {
      value: "1013.25",
      inputUnit: "hPa",
    },
  });

  const inputUnit = watch("inputUnit");

  const onValid = (data: PressureConverterFormValues) => {
    onSubmit({
      value: parseFloat(data.value),
      inputUnit: data.inputUnit,
    });
  };

  return (
    <View className="gap-4">
      <View>
        <Text className="text-cockpit-white text-sm font-sans-medium mb-2">Input Unit</Text>
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Button
              label="QNH (hPa)"
              onPress={() => setValue("inputUnit", "hPa")}
              variant={inputUnit === "hPa" ? "primary" : "secondary"}
              size="md"
            />
          </View>
          <View className="flex-1">
            <Button
              label="BARO (inHg)"
              onPress={() => setValue("inputUnit", "inHg")}
              variant={inputUnit === "inHg" ? "primary" : "secondary"}
              size="md"
            />
          </View>
        </View>
      </View>

      <Controller
        control={control}
        name="value"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Pressure Value"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            suffix={inputUnit}
            placeholder={inputUnit === "hPa" ? "e.g. 1013.25" : "e.g. 29.92"}
            error={errors.value?.message}
            hint={inputUnit === "hPa" ? "Standard: 1013.25 hPa" : "Standard: 29.92 inHg"}
          />
        )}
      />

      <Button
        label="Convert"
        onPress={handleSubmit(onValid)}
        loading={loading}
        size="lg"
        className="mt-2"
        disabled={isSubmitting}
      />
    </View>
  );
}
