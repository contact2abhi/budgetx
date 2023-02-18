import { View, StyleSheet } from "react-native";
import CategoryList from "../../components/CategoryList";
import Form from "../../components/Form";

function ItemForm() {
    const formConfig = [
        {
            id: 1,
            title: "Name",
            dataName: "name",
            hasFocus: true,
        },
        {
            id: 2,
            title: "Date",
            dataName: "date",
            hasFocus: false,
            inputProps: {
                keyboardType: 'decimal-pad'
            }
        },
        {
            id: 3,
            title: "Discription",
            dataName: "discription",
            hasFocus: false,
            
            inputProps: {
                multiline: true,
                style: { height: 150, textAlignVertical: "top" }
            }
        }
    ];

    return <View style={styles.container}>
        <CategoryList />
        <Form inputs={formConfig} onSave={(data) => console.log(data)} />
    </View>;
}

export default ItemForm;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});