import { useState,useEffect,useRef } from 'react'
import './App.css'
import Markdown from './Markdown'

function App() {
const[preview,setPreview]=useState( `*This is just a demo documentation you can edit this text and add yours*

***Headers: you can type:h1,h2,h3,h4,h5,h6 to attain this***
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

*Italics text*

**bold text**

*For the link item you can type 'L[' as a shortcut*

[Link item](link)

![image item](htt)

- My list item
- Another list 
  * Embeded list 
  * Another embeded list 
1. My numbered list 
2. MY numbered list 

\`What if I want to write a single line code\`
\`\`\`
Multiple line 
Code
\`\`\`
*I can forget my table*

|Header 1| Header 2| Header 3|
|-|:-:|-|
|Item1|item2|item3 |

Oh! My horizontal line
---
---
so light 😁

> Blockquote 

~strikethrough-~

* [ ] To do list
* [X] Checked To list item
* 
Then who loved Maths 😁

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

Tada!! so beautiful 😌

More features here enjoy

    `)
    
    
const textref = useRef()

useEffect(()=>{
    if(textref && textref.current){
        textref.current.style.height='0px'
        const scHeight = textref.current.scrollHeight
        textref.current.style.height=scHeight + 'px'
    }
},[preview])
    
    const handlePreview=(e)=>{
    setPreview(e.target.value) 
    }
  return (
    <>
    <Markdown handlePreview={handlePreview}    preview={preview} textref={textref} />
    </>
  )
}

export default App
