import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 20
    },
    containerItem:{ 
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5 
    },
    textItem:{ 
        fontSize: 16 
    },
    textDelete:{ 
        color: "red"
        ,fontWeight: "bold" 
    },
    listContainer:{ 
        marginTop: 10 
    }
})