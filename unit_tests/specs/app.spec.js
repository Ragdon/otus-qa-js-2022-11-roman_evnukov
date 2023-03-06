import { nameIsValid, fullTrim, getTotal } from '../src/app.js'


describe('test function nameIsValid', () => {
    const data = [
        { name: ["Ragdon", "RAGDON", "RaGdOn_?!1!"], isValid: true },
        { name: "Ragdon 1", isValid: false },
        { name: 1, isValid: true },
        { name: 123, isValid: false },
        { name: "Роман", isValid: true },
        { name: "Роман Евнуков", isValid: true }
    ];

    for (let i = 0; i < 6; i++) {
        test('Name data', () => {
            expect(nameIsValid(data[i].name)).toBe(data[i].isValid)
        })
    }
});



describe('test function fullTrim', () => {
    const data = [
        { text: "Rag don", isText: "Ragdon" },
        { text: "Rag don", isText: "Rag don" },
        { text: "Ra gd on 33", isText: "Ragdon33" }
    ];

    for (let i = 0; i < 3; i++) {
        test('Text data', () => {
            expect(fullTrim(data[i].text)).toBe(data[i].isText)
        })
    }
});





describe('test function getTotal', () => {

    test.each`
    price | quantity | discount | expected
    ${1}  |   ${2}   |   ${2}   |${1.96}  
    ${2}  |   ${3}   |   ${8}   |${5.52}  
    ${1}  |   ${2}   |   ${0}   |${2}  
    ${1}  |   ${2}   |   ${"0"}   |${"Скидка должна быть числом"}     
    ${2}  |   ${3}   |   ${-1}   |${"Процент скидки не может быть отрицательным"}`
        ('.add($price, $quantity, $discount, $expected)', ({ price, quantity, discount, expected }) => {
            if (typeof expected == 'number') {
                console.log("number")
                expect(getTotal([{ price, quantity }], discount)).toBe(expected)
            }
            else {
                expect(() => getTotal([{ price, quantity }], discount)).toThrow()
            }
        })
});


