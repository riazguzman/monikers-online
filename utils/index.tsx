import header from "@/components/header";
import Header from "@/components/header";

export const pageOptions = {
  home: {
    headerTitle: () => <Header title="Home" />,
    headerBackTitleVisible: false,
  },
  lobby: {
    headerTitle: () => <Header title="Lobby" />,
    headerBackTitleVisible: false,
  },
  join: {
    headerTitle: () => <Header title="Join" />,
    headerBackTitleVisible: false,
  },
  shop: {
    headerTitle: () => <Header title="Shop" />,
    headerBackTitleVisible: false,
  },
};
