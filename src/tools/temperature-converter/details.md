# Temperature Converter

## What it does
This converter translates a temperature between eight scales at once: Kelvin, Celsius, Fahrenheit, Rankine, Delisle, Newton, Réaumur and Rømer. Type a value into any field and every other field updates immediately. Internally, every scale is converted through Kelvin, the SI base unit, so the results stay consistent no matter which field you edit.

## Why someone uses it
- Reading a foreign recipe, weather report or appliance manual that uses a different scale than the one you know.
- Checking a datasheet where a component's operating range is listed in Celsius but your monitoring tool reports Fahrenheit.
- Studying physics or chemistry, where Kelvin is required for gas-law and thermodynamic formulas.
- Working with historical documents that use obsolete scales such as Réaumur or Delisle.

## Step-by-step instructions
1. Find the field for the scale you already have (for example, Celsius).
2. Type the number. Negative values and decimals are accepted.
3. Read the equivalent values in the other seven fields.
4. To go the other way, simply edit a different field; the rest recalculate from it.

## Examples
- **Water freezes:** 0 °C = 32 °F = 273.15 K = 491.67 °R.
- **Water boils (at sea level):** 100 °C = 212 °F = 373.15 K.
- **Body temperature:** 37 °C ≈ 98.6 °F.
- **Absolute zero:** 0 K = −273.15 °C = −459.67 °F = 0 °R.
- **Where two scales meet:** −40 °C equals −40 °F, the only point where Celsius and Fahrenheit agree.

## Understanding the results
Celsius and Kelvin have the same degree size; Kelvin is simply Celsius shifted by 273.15. Fahrenheit degrees are smaller (180 Fahrenheit degrees span the same range as 100 Celsius degrees), so the conversion has both a scale factor of 9/5 and an offset of 32. Rankine uses Fahrenheit-sized degrees but starts at absolute zero, just as Kelvin does for Celsius. The remaining scales (Delisle, Newton, Réaumur, Rømer) are historical; they appear here for reference and for reading old sources. Results are floating-point numbers, so you may occasionally see a tiny trailing digit such as 0.30000000000000004; that is a property of binary arithmetic, not an error in the formula.

## FAQs
- **Which scale should I use for science?** Kelvin. It has a true zero, so ratios and gas-law calculations behave correctly.
- **Why is Delisle reversed?** The Delisle scale counts downward from boiling point, so colder temperatures have larger numbers. This is expected.
- **Can I enter values below absolute zero?** The fields accept them mathematically, but such temperatures are physically impossible.
- **Is anything sent to a server?** No. The arithmetic runs in your browser.

## Common mistakes
- Adding 273 instead of 273.15 when converting Celsius to Kelvin; the difference matters for precise work.
- Converting a temperature *difference* using the offset formula. A change of 10 °C is a change of 18 °F, not 50 °F, because differences do not use the +32 offset.
- Confusing Rankine (°R) with Réaumur (°Ré); the symbols look alike but the scales are unrelated.

## Use cases
- Setting server-room or cold-storage alert thresholds from vendor specs.
- Homework and lab reports in physics and chemistry.
- Translating oven settings between international recipes.
- Verifying sensor readings from hardware that reports raw Kelvin.

## Related tools
- **Math Evaluator:** Evaluate unit expressions such as `100 degC to degF`.
- **Percentage Calculator:** Work out percentage change between two readings.
- **Chronometer:** Time how long a process takes at a given temperature.
