import { calculate_selling_price } from './coffee.js'

test("Calculate Gold Coffee Selling Price", () => {
    expect(calculate_selling_price(1, 10.00, 'gold', 10)).toBe("23.33")
    expect(calculate_selling_price(2, 20.50, 'gold', 10)).toBe("64.67")
    expect(calculate_selling_price(5, 12.00, 'gold', 10)).toBe("90.00")
})

test("Caclulate Arabic Coffee Selling Price", () => {
    expect(calculate_selling_price(1, 10.00, 'arabic', 10)).toBe("21.76")
    expect(calculate_selling_price(2, 20.50, 'arabic', 10)).toBe("58.24")
    expect(calculate_selling_price(5, 12.00, 'arabic', 10)).toBe("80.59")
})