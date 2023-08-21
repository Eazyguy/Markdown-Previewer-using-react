import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Card,Form,CardGroup} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import math from 'remark-math'
import katex from 'rehype-katex'
import 'katex/dist/katex.min.css'


const Markdown = ({preview,handlePreview,textref}) => {
       
// set Keymap
const keymap = {
    // value: the value to insert when the character is typed
    // pos: the number of characters the cursor should move forwards
    '<': {value: '<>', pos: 0},
    '(': {value: '()', pos: 0},
    '{': {value: '{}', pos: 0},
    '[': {value: '[]', pos: 0},
    '![': {value: '![](img)', pos:0},
    'L[': {value: '[](link)', pos: 0},
    '$$': {value: '$$$$', pos: 0},
    "\\": {value: '\\\\', pos: 0},
    '"': {value: '""', pos: 0},
    '“': {value: '“”', pos: 0},
    '`': {value: '``', pos: 0},
    '#`': {value: '``````', pos: 1},
    '‘': {value: '‘’', pos: 0},
    '«': {value: '«»', pos: 0},
    '「': {value: '「」', pos: 0},
    '1*': {value: '**', pos: -1},
    '**': {value: '****', pos: 0},
    '>': {value: '> ', pos: 0},
    '~': {value: '~~', pos: 0},
    'h1':{value: '# ', pos: 1},
    'h2':{value: '## ', pos: 1},
    'h3':{value: '### ', pos: 2},
    'h4':{value: '#### ', pos: 3},
    'h5':{value: '##### ', pos: 4},
    'h6':{value: '###### ', pos: 5},
};

const snipMap=(e)=>{
function getWord(text, caretPos) {
    let preText = text.substring(0, caretPos);
    let split = preText.split(/\s/);
    return split[split.length - 1].trim();
}

const word = getWord(e.target.value, e.target.selectionStart);
if (word && keymap[word]) {
    e.preventDefault();
    const pos = e.target.selectionStart;
    // Subtract the word's length because we need to remove the snippet from the original text
    e.target.value = e.target.value.slice(0, pos - word.length) +
     keymap[word].value + 
     e.target.value.slice(e.target.selectionEnd);
            
    e.target.selectionStart = e.target.selectionEnd = pos + keymap[word].pos;
    }
}
// set bullet list

const handleBulletAndTab = (e) =>{
    if (e.key === 'Enter') {
        function looksLikeBullet(text, caretPos) {
         let line = text.substring(0, caretPos).split(/\r?\n|\r/).pop();
        
        let bulletRegex = /^([ \t]*[\*\-\+]\s*).*/gim;
        let numberedListRegex = /^([ \t]*\d+\.\s*).*/gim;
        if (bulletRegex.test(line)) {
        return {
        bullet: line.replace(bulletRegex, '$1')
        };
        }else if (numberedListRegex.test(line)) {
        return {
        bullet: line
        .replace(numberedListRegex, "$1")
        .replace(/\d+/, (number) => + number + 1)
        }
        }
        return false;
        }
        
        let bullet = looksLikeBullet(e.target.value, e.target.selectionStart);
        if (bullet) {
        e.preventDefault();
        // Store the text after the cursor, so it can be added to the next line:
        let addition = e.target.value.substring(e.target.selectionStart);
        // Remove the text after the cursor:
        e.target.value = e.target.value.substring(0, e.target.selectionStart);
        // Insert the bullet in the textarea
        e.target.value += ('\n' + bullet.bullet + addition);
        }
        }else if (event.key === 'Tab') {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)

          event.preventDefault()
          }
}
     return (
          <div>
    <CardGroup>
        <Card bg={'info'} style={{width:'21rem'}}>
             <Card.Header>
                Markdown Editor
                </Card.Header>
          <Card.Body>
               <Form.Control as="textarea" rows={15} className='textarea' onChange={handlePreview} onInput={snipMap} onKeyDown={handleBulletAndTab} ref={textref}>
               {preview}
                </Form.Control>  
              </Card.Body>             
                         </Card>
   <Card bg={'info'} style={{width:'21rem', minHeight:'300px'}}>
       <Card.Header>
           Markdown Previewer
           </Card.Header>
       <Card.Body style={{backgroundColor:'white'}}>
               <Card.Text style={{textAlign:'left'}}>
                   <ReactMarkdown remarkPlugins={[gfm,math]} rehypePlugins={[katex]}>   
                  {preview}
                   </ReactMarkdown>
                   </Card.Text>
           </Card.Body>
       </Card>
    </CardGroup>
    </div>
          )
}

export default Markdown
