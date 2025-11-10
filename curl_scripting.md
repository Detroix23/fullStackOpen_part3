# Curl scripting.

## Exemples.

*Get*
```sh
curl -i \
 http://localhost:3001/info
```

*Post*
```sh
curl -i \
 --request POST \
 --data '{"id": "1"}' \
 http://localhost:3001/api/persons
```
  