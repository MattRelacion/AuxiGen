export function searchNote(data){

    if(data == null){
        data = "z"
    }
    data = data.toLowerCase()

    const notes = [
        {note: "a"},
        {note: "b"},
        {note: "c"},
        {note: "d"},
        {note: "e"},
        {note: "f"}
    ]

    if (notes.includes(data)){
        console.log("Success")
    } else {
        console.log("Error! :(")
    }
}