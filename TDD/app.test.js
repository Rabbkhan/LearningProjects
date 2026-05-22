import test from  'node:test'
import {getFullName} from './app.js'
import  assert  from 'node:assert'


test("that return the fullname", (t)=>{

    const result = getFullName('Rabbil', 'Khan')
    const expected = "Rabbil Khan"
    assert.strictEqual(result, expected)
})