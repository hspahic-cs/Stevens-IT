Name: Harris Spahic
CWID: 10460436

-----------------------------------------------------------------------------------------------
QUERY #1: 

WITH q1 (cust, prod, month, state, cust_avg) AS (
	SELECT cust, prod, month, state, AVG(quant)
	FROM sales
	GROUP BY cust, prod, month, state
	ORDER BY cust, prod, month, state
), q2 (cust, prod, month, state, other_prod_avg) AS (
	SELECT cust, prod, month, state, (
		SELECT AVG(quant)
		FROM sales Q
		WHERE Q.cust = S.cust AND Q.prod != S.prod AND Q.month = S.month AND Q.state = S.state
	)
	FROM sales S
	GROUP BY cust, prod, month, state
	ORDER BY cust, prod, month, state
), q3 (cust, prod, month, state, other_month_avg) AS (
	SELECT cust, prod, month, state, (
		SELECT AVG(quant)
		FROM sales Q
		WHERE Q.cust = S.cust AND Q.prod = S.prod AND Q.month != S.month AND Q.state = S.state
	)
	FROM sales S
	GROUP BY cust, prod, month, state
	ORDER BY cust, prod, month, state
), q4 (cust, prod, month, state, other_state_avg) AS (
	SELECT cust, prod, month, state, (
		SELECT AVG(quant)
		FROM sales Q
		WHERE Q.cust = S.cust AND Q.prod = S.prod AND Q.month = S.month AND Q.state != S.state
	)
	FROM sales S
	GROUP BY cust, prod, month, state
	ORDER BY cust, prod, month, state
), temp (cust, prod, month, state, cust_avg, other_prod_avg) AS (
	SELECT q1.cust, q1.prod, q1.month, q1.state, q1.cust_avg, q2.other_prod_avg  
	FROM q1
	JOIN q2 ON q1.cust = q2.cust AND q1.prod = q2.prod AND q1.state = q2.state AND q1.month = q2.month
), temp2 (cust, prod, month, state, other_month_avg, other_state_avg) AS (
	SELECT q3.cust, q3.prod, q3.month, q3.state, q3.other_month_avg, q4.other_state_avg
	FROM q3
	JOIN q4 ON q3.cust = q4.cust AND q3.prod = q4.prod AND q3.state = q4.state AND q3.month = q4.month
)

SELECT *
FROM q1
NATURAL JOIN q2
NATURAL JOIN q3
NATURAL JOIN q4

-----------------------------------------------------------------------------------------------
QUERY #2: 

WITH before_tb(cust, prod, state, month, before_val) AS (
	SELECT cust, prod, state, month, (
		SELECT AVG(quant)
		FROM sales Q
		WHERE S.cust = Q.cust AND S.prod = Q.prod AND S.state = Q.state AND S.month - 1 = Q.month)
	FROM sales S
	GROUP BY cust, prod, state, month
	ORDER BY cust, prod, state, month
), after_tb(cust, prod, state, month, after_val) AS (
	SELECT cust, prod, state, month, (
		SELECT AVG(quant)
		FROM sales Q
		WHERE S.cust = Q.cust AND S.prod = Q.prod AND S.state = Q.state AND S.month + 1 = Q.month)
	FROM sales S
	GROUP BY cust, prod, state, month
	ORDER BY cust, prod, state, month
), final_result(cust, prod, state, month, before_avg, after_avg) AS (
	SELECT * 
	FROM before_tb natural join after_tb
)

SELECT * FROM final_result

-----------------------------------------------------------------------------------------------
QUERY #3: 

WITH comp_dist (prod, quant, distances) AS (
	SELECT S.prod, S.quant, S.quant - Q.quant 
	FROM sales AS S, sales AS Q
	WHERE S.quant != Q.quant AND S.prod = Q.prod
	GROUP BY S.prod, S.quant, Q.quant
	ORDER BY S.prod, S.quant
), tl_distances (prod, quant, tl_distance) AS (
	SELECT prod, quant, ABS(SUM(distances))
	FROM comp_dist
	GROUP BY prod, quant
	ORDER BY prod, quant
), results (prod, med) AS (
	SELECT prod, MIN(ABS(tl_distance))
	FROM tl_distances
	GROUP BY prod
	ORDER BY prod
) SELECT prod, quant FROM tl_distances NATURAL JOIN results WHERE tl_distance = med


----------------------------------------------------------------------------------------------------
QUERY #4:

WITH acml_sum(cust, prod, month, aggr_quant) AS (
	SELECT cust, prod, month,(
		SELECT SUM(quant)
		FROM Sales Q
		WHERE S.month >= Q.month AND S.cust = Q.cust AND S.prod = Q.prod
		)
	FROM Sales S
	GROUP BY cust, prod, month
	ORDER BY cust, prod, month
), total_sum(cust, prod, total) AS (
	SELECT cust, prod, SUM(quant) * .75
	FROM sales
	GROUP BY cust, prod
	ORDER BY cust, prod
)
SELECT cust, prod, MIN(month) as purchased_by FROM acml_sum NATURAL JOIN total_sum
WHERE aggr_quant > total
GROUP BY cust, prod
ORDER BY cust, prod