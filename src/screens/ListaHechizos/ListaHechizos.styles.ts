import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerBackground: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    container:{
        flex: 1, 
        padding: 20,
        marginTop:70
    },
    containerItem:{ 
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        marginTop:15 
    },
    textItem:{ 
        fontSize: 16,
        color:'white',
        fontWeight:'bold'
    },
    textDelete:{ 
        color: "red"
        ,fontWeight: "bold" 
    },
    listContainer:{ 
        marginTop: 10 
    }
})