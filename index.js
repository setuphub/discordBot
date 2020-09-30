const sqlite3 = require('sqlite3');
const dataBase = new sqlite3.Database('./porrasF1.db');
const {Client} = require('discord.js');
const cliente = new Client({
    partials: ['MESSAGE', 'REACTION']
});


require('dotenv').config();

// Id's de los canales
const canalEntrada =  process.env.CANAL_ENTRADA;
const canalBienvenida = process.env.CANAL_BIENVENIDA;
const canalPorras = process.env.CANAL_PORRAS;

// Id's de mensajes
const mensajeEntrada = process.env.MENSAJE_ENTRADA;

// Id's de roles
const Roleveryone = process.env.ROL_EVERYONE;
const Roladmin = process.env.ROL_ADMIN;
const RolValidado = process.env.ROL_VALIDADO;
const RolInvitado = process.env.ROL_INVITADO;



const comandosImportanes = '```\n -Conectarse por ssh:\n ssh hackersh@hackershunters.com / *3ljG5Z3:Tpu7I ```';




/* cliente contiene toda la info del servidor*/

cliente.on('ready',() => {
    console.log(`Bot conectado al servidor como ${cliente.user.tag}`);
    cliente.user.setStatus('invisible');
    console.log(cliente.user.presence.status);

    //const canal = cliente.channels(channel => channel.name === 'entrada');


    
});

// Evento que recoge la entrada de usuarios al servidor
cliente.on('guildMemberAdd', miembro => {
    // Send the message to a designated channel on a server:
    const channel = miembro.guild.channels.cache.find(ch => ch.id === canalBienvenida);

    miembro.roles.add(RolNuevo);
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenido al servidor, ${miembro.user.username}`);

    miembro.user.createDM('Hola');
});

// Evento que recoge la reaccion de un usuario a un mensaje
cliente.on('messageReactionAdd', (reaction,user) =>{

    const miembro = reaction.message.guild.members.cache.get(user.id);

    if (reaction.message.id === mensajeEntrada && miembro.id.guild === RolInvitado){
        miembro.roles.add(RolValidado);
    }

    console.log(miembro.id.guild);
});


//Evento que recoge los mensajes que se escriben en el servidor
cliente.on('message', message => {

    if(message.channel.name === '🛠pruebas'){
        console.log('Es el canal pruebas');
    }
    if(message.content === '!web'){
        message.channel.send('https://hackershunters.com');
    }

    if(message.channel.id === canalPorras){
        let regex = new RegExp('/!porra(\s[a-zA-Z]*){5}/g'); //Arreglar expresion regular.No funciona cuando se manda mensaje en discord
        if(regex.exec(message.content)){
            console.log('se recibe bien');
        }
    }

    if(message.content === '!comandos'){
        //message.channel.send(comandosImportanes);
        const embed = new RichEmbed()
            .setTitle('Conectarse por ssh al servidor')
            .setColor('WHITE')
            .addField('ssh hackersh@hackershunters.com / *3ljG5Z3:Tpu7I')
        message.channel.send(embed);
    }
})

cliente.login(process.env.DISCORD_TOKEN);
