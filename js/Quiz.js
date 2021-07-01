class Quiz{
    constructor(){
        
    }
    getState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
           gameState = data.val();
        })
       
      }
    
      update(state){
        database.ref('/').update({
          gameState: state
        });
      }

      async start(){
        if(gameState === 0){
            contestant = new Contestant();
          var contestantCountRef = await database.ref("contestantCount").once("value");
          if(contestantCountRef.exists()){
            contestantCount = contestantCountRef.val();
            contestant.getCount();
          }
         
          question = new Question()
          question.display();
        }
      }

      play(){
          question.hide();
          background("yellow");
          fill(0);
          textSize(30);
          text("Results of the Quiz",340,50);
         // text("---------------------",320,65);
          Contestant.getContestantInfo();
          if(allContestants !== undefined){
              debugger;
              var display_answers = 230;
              fill("blue");
              textSize(20);
              text("Those who answered correctly are in green!",130,230);

              for(var plr in allContestants){
                  debugger;
                  var correctAns = "1";
                  if(correctAns === allContestants[plr].answer)
                  fill("green");
                  else
                  fill("red");

                  display_answers+=30;
                  textSize(20);
                  text(allContestants[plr].name + ": " + allContestants[plr].answer,250,display_answers);
              }
          }
      }
}