import { View } from "react-native";
import { ToolCard } from "../../molecules/ToolCard";

interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  isNew?: boolean;
}

const TOOLS: Tool[] = [
  {
    id: "descent-calculator",
    title: "Descent Profile Calculator",
    description:
      "Calculate the required descent rate, angle, and top-of-descent point based on altitude difference, distance, and ground speed.",
    href: "/(app)/tools/descent-calculator",
    category: "Navigation",
    isNew: true,
  },
];

export function ToolsList() {
  return (
    <View className="gap-3">
      {TOOLS.map((tool) => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </View>
  );
}
