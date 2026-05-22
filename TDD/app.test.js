import test from  'node:test'
// import {getFullName} from './app.js'
import  assert  from 'node:assert'
import { normalizeInput } from './app.js'


// test("that return the fullname", (t)=>{

//     const result = getFullName('Rabbil', 'Khan')
//     const expected = "Rabbil Khan"
//     assert.strictEqual(result, expected)
// })



test ("that it trimes the spaces", ()=>{
    const result = normalizeInput("   Rabbil Khan   ")
    const expected = "Rabbil Khan"
    assert.strictEqual(result, expected)
}
)


test("that it returns empty string")