const request = require('request');
const cheerio = require('cheerio');
const wordCount = require('word-count');
const WordCount = require("../models/insightsModel");

//POST Method for getting word count count,media url and Link url
exports.getWordCount = async(req,res,next)=>{
    const url = req.query.url;

  if (!url) {
    return res.send('Please provide a URL');
  }

  request(url, (error, response, html) => {
    if (error) {
      return res.send('Error fetching URL');
    }

    const $ = cheerio.load(html);
    const text = $('body').text();
    const count = wordCount(text);
    const mediaUrls = [];
    const linkUrls = [];

    $('img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        mediaUrls.push(src);
      }
    });
  
    $('video').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        mediaUrls.push(src);
      }
    });

    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && /^https?:\/\//.test(href)) {
        linkUrls.push(href);
      }
    });
    

    const wordCountData = {
      url,
      count,
      mediaUrls,
      linkUrls
    };


   WordCount.create(wordCountData)

    res.send(`Word count for ${url}: ${count} media urls is : ${mediaUrls} and links: ${linkUrls}`);

  });
};

//Get all insights (GET Method)
exports.getAllInsights = async(req,res)=>{

  try {
    const insights = await WordCount.find();

  res.status(200).json({
    success:true,
    insights
  })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    });
  };

};

//Update method for Updating Add to Fav (PUT Method)
exports.updateFavourite = async(req,res)=>{
  console.log(req.body);
  try {
    let insight = WordCount.findById(req.params.id);
    
    
    if(!insight){
      res.status(404).json({message:"insight not found"})
    }
    
    insight = await WordCount.findByIdAndUpdate(req.params.id,req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    
    console.log(req.body);
    res.status(200).json({
      success:true,
      insight
    })
  
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    });
  }

};

//Delete an Insight (DELETE Method)
exports.deleteInsights = (async(req,res)=>{
  try {
    let insight = WordCount.findById(req.params.id);
    
    
    if(!insight){
      res.status(404).json({message:"insight not found"})
    }

    await insight.findOneAndRemove()

    res.status(200).json({
      success: true,
      message: "Insight Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    });
  }
})

