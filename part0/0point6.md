    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa containing JSON data
    activate server
    server-->>browser: status code 201 CREATED browswer handles rest of logic
    deactivate server

```