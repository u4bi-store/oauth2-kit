const express = require('express')
const request = require('request')

const port = 3000
const server = express()

const keys = {
    kakao: {
        redirect_uri: 'http://localhost:3000/kakao/callback',
        client_id: '',
        client_secret: ''
    },
    google: {
        redirect_uri: 'http://localhost:3000/google/callback',
        client_id: '',
        client_secret: ''
    },
    naver: {
        redirect_uri: 'http://localhost:3000/naver/callback',
        client_id: '',
        client_secret: ''
    },
    github: {
        redirect_uri: 'http://localhost:3000/github/callback',
        client_id: '',
        client_secret: ''
    },
    facebook: {
        redirect_uri: 'http://localhost:3000/facebook/callback',
        client_id: '',
        client_secret: ''
    },
    instagram: {
        redirect_uri: 'http://localhost:3000/instagram/callback',
        client_id: '',
        client_secret: ''
    },
    discord: {
        redirect_uri: 'http://localhost:3000/discord/callback',
        client_id: '',
        client_secret: ''
    },
    twitch: {
        redirect_uri: 'http://localhost:3000/twitch/callback',
        client_id: '',
        client_secret: ''
    },
    yahoo: {
        redirect_uri: 'http://localhost:3000/yahoo/callback',
        client_id: '',
        client_secret: ''
    },
    linkedin: {
        redirect_uri: 'http://localhost:3000/linkedin/callback',
        client_id: '',
        client_secret: ''
    }
}

const authKakao = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://kauth.kakao.com/oauth/authorize?redirect_uri=${ redirect_uri }&client_id=${ client_id }&response_type=code`)

const authKakaoCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://kauth.kakao.com/oauth/token', 
        form: {
            grant_type: 'authorization_code',
            redirect_uri,
            client_id,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_kakao=${ access_token }; Path=/;`).redirect('/'))

}

const authGoogle = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${ redirect_uri }&response_type=code&client_id=${ client_id }`)

const authGoogleCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://oauth2.googleapis.com/token', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_google=${ access_token }; Path=/;`).redirect('/'))

}

const authNaver = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://nid.naver.com/oauth2.0/authorize?redirect_uri=${ redirect_uri }&client_id=${ client_id }&state=STATE_STRING&response_type=code`)

const authNaverCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code, state } = req.query

    const data = {
        json:true,
        url:'https://nid.naver.com/oauth2.0/token', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code,
            state
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_naver=${ access_token }; Path=/;`).redirect('/'))

}

const authGithub = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://github.com/login/oauth/authorize?redirect_uri=${ redirect_uri }&client_id=${ client_id }&scope=user&state=test123&allow_signup=false`)

const authGithubCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code, state } = req.query

    const data = {
        json:true,
        url:'https://github.com/login/oauth/access_token', 
        form: {
            client_id,
            redirect_uri,
            client_secret,
            code,
            state
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_github=${ access_token }; Path=/;`).redirect('/'))

}

const authFacebook = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://www.facebook.com/v5.0/dialog/oauth?redirect_uri=${ redirect_uri }&client_id=${ client_id }`)

const authFacebookCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://graph.facebook.com/v5.0/oauth/access_token', 
        form: {
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_facebook=${ access_token }; Path=/;`).redirect('/'))

}

const authInstagram = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://api.instagram.com/oauth/authorize/?redirect_uri=${ redirect_uri }client_id=${ client_id }&response_type=code`)

const authInstagramCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://api.instagram.com/oauth/access_token', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_instagram=${ access_token }; Path=/;`).redirect('/'))

}

const authDiscord = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://discordapp.com/api/oauth2/authorize?redirect_uri=${ redirect_uri }&client_id=${ client_id }&response_type=code&scope=identify email`)

const authDiscordCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://discordapp.com/api/oauth2/token', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_discord=${ access_token }; Path=/;`).redirect('/'))

}

const authTwitch = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://id.twitch.tv/oauth2/authorize?redirect_uri=${ redirect_uri }&client_id=${ client_id }&response_type=code&scope=edit+user:read:email`)

const authTwitchCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://id.twitch.tv/oauth2/token',
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_twitch=${ access_token }; Path=/;`).redirect('/'))


}

const authYahoo = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${ redirect_uri }&client_id=${ client_id }&response_type=code&scope=sdps-r&state=test123`)

const authYahooCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://api.login.yahoo.com/oauth2/get_token', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_yahoo=${ access_token }; Path=/;`).redirect('/'))

}

const authLinkedin = ({ redirect_uri, client_id }) => (_, res) => res.redirect(`https://www.linkedin.com/oauth/v2/authorization?redirect_uri=${ redirect_uri }&client_id=${ client_id }&response_type=code&scope=r_liteprofile`)

const authLinkedinCallback = ({ redirect_uri, client_id, client_secret }) => (req, res) => {

    const { code } = req.query

    const data = {
        json:true,
        url:'https://www.linkedin.com/oauth/v2/accessToken', 
        form: {
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            client_secret,
            code
        }
    }

    request.post(data, (_, __, { access_token }) => res.append('Set-Cookie', `access_token_linkedin=${ access_token }; Path=/;`).redirect('/'))

}

server
    .use(express.static('.'))
    .use(express.json())
    .use(express.urlencoded({ extended : true }))
    .get('/kakao/auth', authKakao(keys.kakao))
    .get('/kakao/callback', authKakaoCallback(keys.kakao))
    .get('/google/auth', authGoogle(keys.google))
    .get('/google/callback', authGoogleCallback(keys.google))
    .get('/naver/auth', authNaver(keys.naver))
    .get('/naver/callback', authNaverCallback(keys.naver))
    .get('/github/auth', authGithub(keys.github))
    .get('/github/callback', authGithubCallback(keys.github))
    .get('/facebook/auth', authFacebook(keys.facebook))
    .get('/facebook/callback', authFacebookCallback(keys.facebook))
    .get('/instagram/auth', authInstagram(keys.instagram))
    .get('/instagram/callback', authInstagramCallback(keys.instagram))
    .get('/discord/auth', authDiscord(keys.discord))
    .get('/discord/callback', authDiscordCallback(keys.discord))
    .get('/twitch/auth', authTwitch(keys.twitch))
    .get('/twitch/callback', authTwitchCallback(keys.twitch))    
    .get('/yahoo/auth', authYahoo(keys.yahoo))
    .get('/yahoo/callback', authYahooCallback(keys.yahoo))
    .get('/linkedin/auth', authLinkedin(keys.linkedin))
    .get('/linkedin/callback', authLinkedinCallback(keys.linkedin))    

server.listen(port, err => console.log(`oauth2-kit started on port ${ port }`))