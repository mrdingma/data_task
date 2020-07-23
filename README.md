<img src="https://i.imgur.com/7yjjkck.png">

# Step 4

Since the target is above 90% agreement, the metrics currently fall far below the target. The 3 Label agreement rate is roughly 30-35%, and the 5 Label agreement is ~20%. The result is not surprising, and actually falls within expectation given the random nature of the labeling. In order to improve metrics, major changes need to be implemented.

If we are talking hypothetically, and the raters consciously selected the labels in our dataset, then I would suggest

1. re-training the raters entirely since there is disagreement on 2 out of 3 for 3Label and 4 out of 5 for 5Label.
2. flagging raters that are performing below expectation.
3. adding a review layer (a 2nd rater) in place, to better ensure accuracy.

# Step 5

1. At what rate did raters label higher than the engineer?
2. At what rate did raters label lower than the engineer?
3. At what pace did raters complete tasks (tasks/day. tasks/week)

# Step 6

SELECT  
Rater,    
SUM(case Label_Agreement_3 when 'yes' then 1 else 0 end) 3LabelAgreeCount,  
SUM(case Label_Agreement_5 when 'yes' then 1 else 0 end) 5LabelAgreeCount,  
count(\*) as Total,  
3LabelAgreeCount / Total as 3LabelRate,  
5LabelAgreeCount / Total as 5LabelRate,  

FROM rater_data

GROUP BY Rater

WHERE Date = '10/6/05'
