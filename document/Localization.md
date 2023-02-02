How to create new language

1. Create a directory called that ıf you want to add which the name of the language in resources/js/Translates (Ex: bg for Bulgarian)
2. Create a json file for translations under the created directory (Ex: profile.json)
   3. ```{"profile": "Profil"}```
3. Add new language from /resources/js/locale.js
   4. ``const bg = import.meta.glob('./Translates/bg/*.json')``
   5. ``messages: { ..., bg: getTranslates(bg)``
