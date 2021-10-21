# Frontend

Single page app avec vue3

2 composants : 
Messager pour envoyer les messages -> requete envoi le message en POST "msg=val"
MessagesFromDB pour recuperer ceux coté server -> requete recupere un objet :
{
    list_messages: [
        {
            timestamp: aaaaaaa,
            message: mon_message
        },
        {
             timestamp: aaaaaaa,
            message: mon_message
        }
    ]
}

cross origin ? donc "Access-Control-Allow-Origin: *" dans l'header des réponses du server ?!