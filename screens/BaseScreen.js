import { ScrollView } from "react-native";

function BaseScreen({ children }) {
    return <ScrollView style={{ flex: 1 }}>
            {children}
        </ScrollView>
}

export default BaseScreen;