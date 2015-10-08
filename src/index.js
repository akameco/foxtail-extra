import Response from 'foxtail/lib/response'
import fs from 'fs'

Response.prototype.show = function() {
  console.log(`${this.user_name}(@${this.screen_name}) ${this.text}`)
}

Response.prototype.images = function(){
  const images = []
  if (this.tweet.extended_entities) {
    for(let m of this.tweet.extended_entities.media) {
      images.push(m.media_url)
    }
  }
  return images
}

Response.prototype.mediaUpload = function(file, msg){
  const T = this.fox.twit
  const content = fs.readFileSync(file, { encoding: 'base64' })

  T.post('media/upload', { media_data: content }, (err, data) => {
    const mediaIdStr = data.media_id_string
    const params = { status: msg, media_ids: [mediaIdStr] }

    T.post('statuses/update', params, () => { })
  })
}

Response.prototype.downloadImage = function(){}

Response.prototype.follow = function(){}

Response.prototype.block = function(){}
