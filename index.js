const idServer = require('./id');
const {Client} = require('discord.js');
const cliente = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const token2 = idServer.token;
const token = 'NzU1MDg0ODQ3MDU5NTY2NzMz.X1-JkA.5rVnOiPSuPW-2r3q2KHfKaFT92g';

// Id's de los canales
const canalEntrada =  '755084093083091003';
const canalBienvenida = '760456798590992396';

// Id's de mensajes
const mensajeEntrada = '755383591105724445';

// Id's de roles
const Roleveryone = '755077755422507070';
const Roladmin = '756096073273049108';
const RolValidado = '760459070339022858';
const RolInvitado = '760445344432914443';



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
    console.log(message.channel.name);

    if(message.channel.name === '🛠pruebas'){
        console.log('Es el canal pruebas');
    }
    if(message.content === '!web'){
        message.channel.send('https://hackershunters.com');
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

cliente.login(token);
