# React Native Cheatsheet — ShoeZam

## 1. Layout and Flexbox

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `View` | A container used to group and arrange UI elements. | React Native component |
| `flex` | Controls how much space a component takes relative to other flexible components. | `1` commonly means fill available space; `0` means no flexible growth |
| `flexDirection` | Sets the direction children are arranged. | `"column"` (vertical, default); `"row"` (horizontal); `"row-reverse"`; `"column-reverse"` |
| `justifyContent` | Arranges children along the main axis. | `"flex-start"`, `"center"`, `"flex-end"`, `"space-between"`, `"space-around"`, `"space-evenly"` |
| `alignItems` | Aligns children across the cross axis. | `"flex-start"`, `"center"`, `"flex-end"`, `"stretch"`, `"baseline"` |
| `alignSelf` | Overrides `alignItems` for one child. | `"auto"`, `"flex-start"`, `"center"`, `"flex-end"`, `"stretch"`, `"baseline"` |
| `flexWrap` | Controls whether children can move onto another line when they run out of space. | `"nowrap"` (default), `"wrap"`, `"wrap-reverse"` |
| `gap` | Adds space between children in a layout. | Number, e.g. `12` |
| `rowGap` | Sets space between rows. | Number, e.g. `20` |
| `columnGap` | Sets space between columns. | Number, e.g. `12` |
| `width` | Sets component width. | Number, e.g. `100`; percentage string, e.g. `"48%"`; `"auto"` in supported cases |
| `height` | Sets component height. | Number, e.g. `80`; percentage string, e.g. `"100%"`; `"auto"` in supported cases |
| `minWidth` / `maxWidth` | Sets the smallest / largest allowed width. | Numbers or supported percentage strings |
| `minHeight` / `maxHeight` | Sets the smallest / largest allowed height. | Numbers or supported percentage strings |
| `position` | Chooses normal layout or positioning relative to a containing view. | `"relative"` (default), `"absolute"` |
| `top`, `right`, `bottom`, `left` | Offsets a positioned component from an edge. | Number, e.g. `right: -5` |
| `zIndex` | Controls which overlapping component appears in front. | Number, e.g. `1`, `2` |
| `overflow` | Controls how content outside a component's bounds is shown. | `"visible"`, `"hidden"`, `"scroll"` (support varies by platform/component) |

## 2. Spacing, Borders, and Backgrounds

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `padding` | Space inside a component's edges. | Number, e.g. `12` |
| `paddingHorizontal` | Padding on the left and right. | Number, e.g. `20` |
| `paddingVertical` | Padding on the top and bottom. | Number, e.g. `10` |
| `paddingTop` / `paddingBottom` | Padding on the top / bottom. | Number |
| `paddingLeft` / `paddingRight` | Padding on the left / right. | Number |
| `margin` | Space outside a component's edges. | Number |
| `marginHorizontal` | Margin on the left and right. | Number |
| `marginVertical` | Margin on the top and bottom. | Number |
| `marginTop` / `marginBottom` | Margin above / below a component. | Number |
| `marginLeft` / `marginRight` | Margin on the left / right. | Number |
| `backgroundColor` | Sets the background color. | Named color, hex like `"#FFFFFF"`, `rgb(...)`, `rgba(...)` |
| `borderWidth` | Sets border thickness. | Number, e.g. `1` |
| `borderColor` | Sets border color. | Color value |
| `borderRadius` | Rounds the corners. | Number; e.g. `12`; `999` can make a pill/circle depending on dimensions |
| `elevation` | Adds a shadow on Android. | Number, e.g. `1`, `4` |
| `opacity` | Sets how transparent a component is. | `0` (invisible) to `1` (fully opaque) |

## 3. Text

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `Text` | Displays text. | React Native component |
| `fontSize` | Sets text size. | Number, e.g. `14`, `18`, `24` |
| `fontWeight` | Sets text thickness. | `"normal"`, `"bold"`, or string weights such as `"400"`, `"500"`, `"600"`, `"700"` (supported values depend on platform/type definitions) |
| `color` | Sets text or icon color. | Named color, hex like `"#9C2327"`, `rgb(...)`, `rgba(...)` |
| `textAlign` | Aligns text horizontally. | `"auto"`, `"left"`, `"right"`, `"center"`, `"justify"` |
| `textDecorationLine` | Adds a line to text. | `"none"`, `"underline"`, `"line-through"`, `"underline line-through"` |
| `lineHeight` | Sets the height of each line of text. | Number, e.g. `20` |
| `letterSpacing` | Adjusts space between letters. | Number, e.g. `1` or `-0.5` |
| `numberOfLines` | Limits how many lines a `Text` component displays. | Integer, e.g. `1`, `2`; extra text is truncated |
| `fontStyle` | Changes text style. | `"normal"`, `"italic"` |
| `includeFontPadding` | Controls extra font padding on Android. | `true`, `false` |

## 4. Images

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `Image` | Displays an image. | React Native component |
| `source={require("...")}` | Loads a local image bundled with the app. | A valid local image path |
| `source={{ uri: "https://..." }}` | Loads an image from a URL. | Image URL; network access required |
| `resizeMode` | Controls how an image fits its image box. | `"cover"` (fills box, may crop); `"contain"` (shows whole image, may leave empty space); `"stretch"` (stretches to fit); `"repeat"` (tiles image); `"center"` (centers at original size) |
| `resizeMode="contain"` | Shows the whole image without cropping, keeping its proportions. | Common for shoe/product images |
| `width` / `height` | Sets the image box dimensions. | Number or supported percentage string |
| `onLoad` | Runs a callback when the image loads successfully. | Function |
| `onError` | Runs a callback if the image fails to load. | Function |

## 5. Buttons and Touch

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `Pressable` | Makes content respond to presses/taps. | React Native component |
| `onPress` | Function called when the user presses a component. | Callback function, e.g. `onPress={() => console.log("Tapped")}` |
| `disabled` | Disables interaction when set to true. | `true`, `false` |
| `TouchableOpacity` | Older/common touchable that fades opacity when pressed. | React Native component |
| `activeOpacity` | Opacity while a `TouchableOpacity` is pressed. | Number from `0` to `1` |
| `Button` | Basic built-in button component. | React Native component; limited styling |
| `Pressable` style callback | Lets styles change based on whether the component is pressed. | `style={({ pressed }) => (...)}`; `pressed` is `true` or `false` |

## 6. Inputs and Scrolling

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `TextInput` | Lets the user type text. | React Native component |
| `placeholder` | Hint text shown when the input is empty. | String, e.g. `"Search..."` |
| `placeholderTextColor` | Sets the placeholder color. | Color value |
| `value` | Current value shown in a controlled input. | Usually a state variable |
| `onChangeText` | Function called when typed text changes. | Callback receiving the new text |
| `keyboardType` | Chooses the keyboard layout. | `"default"`, `"numeric"`, `"number-pad"`, `"decimal-pad"`, `"email-address"`, `"phone-pad"` and others |
| `secureTextEntry` | Hides typed characters, useful for passwords. | `true`, `false` |
| `ScrollView` | Makes content scrollable; renders its children together. | Vertical by default |
| `horizontal` | Makes a `ScrollView` scroll sideways. | `true`, `false` |
| `showsVerticalScrollIndicator` | Shows or hides the vertical scrollbar. | `true`, `false` |
| `showsHorizontalScrollIndicator` | Shows or hides the horizontal scrollbar. | `true`, `false` |
| `contentContainerStyle` | Styles the inner container holding scroll content. | Style object / style reference |
| `FlatList` | Efficiently renders a list of items, especially longer lists. | Uses props such as `data`, `renderItem`, `keyExtractor` |
| `key` | Helps React identify list items between renders. | Unique string or number converted to string; use a stable ID |

## 7. Safe Areas and Layout Containers

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `SafeAreaView` from `react-native-safe-area-context` | Keeps content within safe screen areas such as around the notch. | Component; behavior depends on edges/platform |
| `StyleSheet.create({...})` | Organizes styles in one object and helps catch style mistakes with type checking. | Object of named styles |
| `style={styles.name}` | Applies a style defined in `StyleSheet.create`. | Style object/reference |
| `style={{ ... }}` | Applies inline styles directly. | JavaScript style object |
| `ScrollView` | Container that lets content scroll. | Vertical or horizontal |
| `overflow: "hidden"` | Clips content that extends outside the view. | `"visible"`, `"hidden"` where supported |

## 8. React and TypeScript Basics Used So Far

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `import ... from "..."` | Brings a component, function, or value into the file. | Module path |
| `export default function Home()` | Defines and exports the screen component as the file's main export. | Function/component name can vary |
| `return (...)` | Returns the UI tree the component should render. | JSX |
| `<View>...</View>` | JSX component with opening and closing tags. | Component-specific children |
| `{"\\n"}` | Inserts a line break into displayed text. | Escape sequence `\n` |
| `{expression}` | Evaluates JavaScript inside JSX. | Variable, expression, function call, etc. |
| `const name = ...` | Declares a variable that cannot be reassigned. | Any valid value |
| `array.map((item) => ...)` | Creates UI or values for every array item. | Array callback |
| `key={item.id}` | Gives each mapped item a stable identity for React. | Unique, stable ID |
| `require("...")` | Loads a local asset path in common React Native asset patterns. | Static asset path |
| `StyleSheet.create({...})` | Defines named style objects. | Object |
| `({ color, size }) => (...)` | Arrow function that receives an object and extracts `color` and `size` using destructuring. | Function syntax |
| `({ route }) => ({ ... })` | Function form of `screenOptions`; receives route-related information and returns an options object. | Function returning an object |
| `condition ? A : B` | Chooses one value based on a condition. | `true ? valueA : valueB` |
| `// comment` | Adds a single-line code comment. | Text after `//` on that line |
| `{/* comment */}` | Adds a comment inside JSX. | Text inside comment markers |

## 9. Expo Router Navigation

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `Stack` | Navigator for screens arranged in a stack. | Imported from `expo-router` |
| `<Stack.Screen name="tabs" />` | Registers/configures the `tabs` route in the root stack layout. | Route name matching file/folder structure |
| `Tabs` | Navigator that displays a bottom tab bar. | Imported from `expo-router` |
| `<Tabs.Screen name="index" />` | Configures the tab route that maps to `index.tsx` in the tabs folder. | Route name |
| `screenOptions` | Shared navigation options for screens in that navigator. | Object or supported function returning an object |
| `options` | Options for one particular screen. | Object |
| `headerShown` | Shows or hides the navigation header. | `true`, `false` |
| `title` | Sets the screen title or tab label when used in the relevant screen options. | String, e.g. `"Home"` |
| `tabBarIcon` | Function that returns the icon for a tab. | Callback receiving values such as `color`, `size`, and route information |
| `tabBarActiveTintColor` | Color for the selected tab icon and label. | Color value |
| `tabBarInactiveTintColor` | Color for unselected tab icons and labels. | Color value |
| `tabBarStyle` | Styles the bottom tab bar container. | React Native style object |
| `tabBarLabelStyle` | Styles the tab label text. | React Native text style object |
| `tabBarIcon: ({ color, size }) => (...)` | Receives icon color and size from the navigator and returns an icon. | Callback function |
| `Ionicons` | Icon component from `@expo/vector-icons`. | `name`, `size`, `color` props |
| `name="home-outline"` | Selects which Ionicons glyph to display. | Valid Ionicons icon name |
| `size={size}` | Uses the size supplied by the navigator. | Number |
| `color={color}` | Uses the color supplied by the navigator. | Color value |
| `router.navigate("...")` | Navigates to a route when using Expo Router's router API. | Route path, e.g. `"/tabs/wishlist"` when matching your route structure |

## 10. Common Color and Value Examples

| Code / syntax | Meaning | Possible values / options |
|---|---|---|
| `"#FFFFFF"` | Hex color code for white. | `#RGB`, `#RRGGBB`, or alpha variants supported by React Native |
| `"#000000"` | Hex color code for black. | Other hex color codes |
| `"#9C2327"` | ShoeZam's red accent color used in the current code. | Any valid color value |
| `"#F2F2F2"` | Light gray background used in the current code. | Any valid color value |
| `true` / `false` | Boolean values, often used to turn a feature on or off. | `true`, `false` |
| `12`, `20`, `80` | Numeric style values; dimensions are generally density-independent units. | Positive, zero, or negative where the property allows it |
| `"48%"` | Percentage-based dimension relative to the parent where supported. | Percentage string |
| `"row"` | String option for a style property such as `flexDirection`. | Only the values accepted by that property |
| `"contain"` | String option for an image property such as `resizeMode`. | Only the values accepted by that property |

## Quick reminders

- React Native layout styles are similar to CSS ideas, but property names and supported values can differ.
- Use `StyleSheet.create` to keep styles organized.
- `flex: 1` commonly tells a view to take up available space.
- `justifyContent` works along the main axis; `alignItems` works across the cross axis.
- `resizeMode="contain"` is useful for product images when you want the entire shoe visible.
- `screenOptions` applies shared navigator settings; `options` applies settings to one screen.
- In `tabBarIcon`, `color` and `size` are provided by the navigation library.
- Not every option works on every component. Use the option names supported by the component you're configuring.
