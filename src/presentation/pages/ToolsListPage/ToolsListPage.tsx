import { ListTemplate } from "../../components/templates/ListTemplate";
import { AppHeader } from "../../components/organisms/AppHeader";
import { ToolsList } from "../../components/organisms/ToolsList";

export function ToolsListPage() {
  return (
    <ListTemplate
      header={<AppHeader title="Tools" subtitle="Flight simulation utilities" />}
    >
      <ToolsList />
    </ListTemplate>
  );
}
