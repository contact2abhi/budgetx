import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Colors } from "../utils/Colors";
import { getAllCategories } from "../utils/database";
import CategoryStrip from "./CategoryStrip";
import IconButton from "./IconButton";


function CategoryList({ style, onChange }) {
    const [categories, setCategories] = useState();
    const [categoryId, setCategoryId] = useState();
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data);
            setCategoryId(data[0].id);
        }).catch((err) => {
            Alert.alert("Error!", "Please try after some time.");
        });
    }, [getAllCategories]);

    let categoryItems = <Text>Loading ..</Text>;
    if (categories && categoryId) {
        const selected = categories.find(cat => cat.id === categoryId);
        categoryItems = <CategoryStrip
            category={selected}
            key={categoryId} />;
    }

    function moveCategoryHandler(direction)
    {
        const index = categories.findIndex(cat => cat.id === categoryId);
        let ci = parseInt(index);
        
        let nextIndex = (direction === 'right') ? ci + 1 : ci -1;
        if(nextIndex >= 0 && nextIndex < categories.length  && categories[nextIndex]){
            setCategoryId(categories[nextIndex].id);
            onChange(categories[nextIndex].id, categories[nextIndex].name);
        }
        else {
            nextIndex = ci;
        }
        if(nextIndex === categories.length - 1)
        {
            setIsLast(true);
        }
        else if(nextIndex === 0){
            setIsFirst(true);
        }
        else{
            setIsFirst(false);
            setIsLast(false);
        }
    }

    return <View style={style} >
        <View style={styles.container}>
            <IconButton icon="chevron-back-circle" size={60} onPress={moveCategoryHandler.bind(this, 'left')} color={isFirst ? 'grey' : Colors.main800}></IconButton>
            <View style={styles.categories}>{categoryItems}</View>
            <IconButton icon="chevron-forward-circle" size={60} onPress={moveCategoryHandler.bind(this, 'right')} color={isLast ? 'grey' : Colors.main800}></IconButton>
        </View>
    </View>;
}

export default CategoryList;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        minHeight: 70,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    categories:{

    }
});