var md5sum = require('MD5')
var getImageUrl = function(image,https){
  image = image.split(' ').join('_')
  var md5 = md5sum(image)
  var dir = md5[0] + '/' + md5[0] + md5[1] + '/'
  var url = 'http'
  if(https){
    url += 's'
  }
  url += '://upload.wikimedia.org/wikipedia/commons/' + dir
  url += encodeURI(image)
  return url
}

module.exports = getImageUrl

