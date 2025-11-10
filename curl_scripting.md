# Curl scripting.

## Exemples.

*Get*
```sh
curl -i \
 http://localhost:3001/info

curl \
 http://localhost:3001/api/persons \
 | json_pp -json_opt pretty,canonical

```

*Post*
```sh
curl -i \
 --request POST \
 --data '{"id": "1"}' \
 http://localhost:3001/api/persons
```
  