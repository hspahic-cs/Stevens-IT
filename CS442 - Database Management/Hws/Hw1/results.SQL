NAME: Harris Spahic
CWID: 10460436
----------------------------------------------------------------------------------------
QUERY 1:

WITH q1 AS (
SELECT prod, max(quant) max_q, min(quant) min_q, avg(quant) avg_q
FROM sales
GROUP BY prod
),
q2 as (
SELECT s.prod, max_q, cust max_cust, s.date max_date, s.state st, min_q, avg_q
FROM q1, sales s
WHERE q1.prod=s.prod AND
q1.max_q=s.quant
),
q3 as (
Select sales.prod, max_q, max_cust, max_date, st, min_q, cust min_cust, sales.date min_date, state st, avg_q
From q2 inner join sales
On q2.prod=sales.prod
And q2.min_q=sales.quant
)

SELECT * FROM q3;
--------------------------------------------------------------------------------------
QUERY 2: 

WITH q1 AS (
SELECT prod, cust, state, max(quant) max_q, min(quant) min_q
FROM sales
GROUP BY (prod, cust, state)
order by (prod, cust)
), NY_q as(
Select q1.prod, q1.cust, q1.state, max_q as NY_MAX, s.date as NY_date
FROM q1, sales s  
where q1.state = s.state and q1.prod = s.prod and q1.cust = s.cust and q1.state = 'NY' and s.quant = q1.max_q 
order by (q1.prod, q1.cust, q1.state)
), CT_q as (
Select q1.prod, q1.cust, q1.state, q1.min_q as CT_MIN, s.date as CT_date
From q1, sales s
where q1.state = s.state and q1.prod = s.prod and q1.cust = s.cust and q1.state = 'CT' and s.quant = q1.min_q and year > 2000
order by (q1.prod, q1.cust, q1.state)
), NJ_q as (
Select q1.prod, q1.cust, q1.state, q1.min_q as NJ_MIN, s.date as NJ_date
From q1, sales s
where q1.state = s.state and q1.prod = s.prod and q1.cust = s.cust and q1.state = 'NJ' and s.quant = q1.min_q and year > 2000
order by (q1.prod, q1.cust, q1.state))
SELECT NY_q.prod, NY_q.cust, NY_q.state, NY_MAX, NY_date, CT_MIN, CT_date, NJ_min, NJ_date
FROM NY_q 
LEFT JOIN CT_q
ON NY_q.prod = CT_q.prod and NY_q.cust = Ct_q.cust
LEFT JOIN NJ_q
ON CT_q.prod = NJ_q.prod and CT_q.cust = NJ_q.cust
------------------------------------------------------------------------------------
QUERY 3:

with q1 as(
Select month, state, SUM(quant) as totals
from sales
group by (month, state)
order by (month, state)
), q2 as(
select month, max(totals) as max_q, min(totals) as min_q
from q1
group by month
order by month
), most_pop as(
select q1.state, q2.month, q2.max_q as max_pop
from q1, q2
where q1.month = q2.month and q1.totals = q2.max_q 
), least_pop as (
select q1.state, q2.month, q2.min_q as min_pop
from q1, q2
where q1.month = q2.month and q1.totals = q2.min_q
)
select most_pop.month, most_pop.state, most_pop.max_pop, least_pop.state, least_pop.min_pop 
from most_pop
left join least_pop
on most_pop.month = least_pop.month
-----------------------------------------------------------------------------------------
QUERY 4:

with q1 as(
select cust, prod, count(prod) as total_prod
from sales
group by cust, prod
order by cust, prod
), q2 as(
select cust, state, count(state) as total_state
from sales
group by cust, state
order by cust, state
), prod_totals as(
select cust, max(total_prod) as fav_p, min(total_prod) as hate_p
from q1
group by cust
), state_totals as(
select cust, max(total_state) as fav_s, min(total_state) as hate_s
from q2
group by cust
), min_prod as(
select q1.cust, q1.prod, prod_totals.hate_p 
from q1, prod_totals
where q1.total_prod = prod_totals.hate_p and q1.cust = prod_totals.cust
group by q1.cust, q1.prod, prod_totals.hate_p
), max_prod as(
select q1.cust, q1.prod, prod_totals.fav_p 
from q1, prod_totals
where q1.total_prod = prod_totals.fav_p and q1.cust = prod_totals.cust
group by q1.cust, q1.prod, prod_totals.fav_p
), min_state as(
select q2.cust, q2.state, state_totals.hate_s
from q2, state_totals
where q2.total_state = state_totals.hate_s and q2.cust = state_totals.cust
group by q2.cust, q2.state, state_totals.hate_s
), max_state as(
select q2.cust, q2.state, state_totals.fav_s
from q2, state_totals
where q2.total_state = state_totals.fav_s and q2.cust = state_totals.cust
group by q2.cust, q2.state, state_totals.fav_s
), finished as (
select min_prod.cust, max_prod.prod as Most_Fav_Prod, min_prod.prod as Least_Fav_Prod, max_state.state as Most_Fav_St, min_state.state as Least_Fav_St
from min_prod, max_prod, min_state, max_state
where min_prod.cust = max_prod.cust and min_prod.cust = max_state.cust and min_prod.cust = min_state.cust
order by min_prod.cust)

select *
from finished
-------------------------------------------------------------------------------
QUERY 5:

with q1 as(
select prod, cust, sum(quant) as Q1_TOT
from sales
where sales.month < 4
group by prod, cust
order by prod, cust
), q2 as(
select prod, cust, sum(quant) as Q2_TOT
from sales
where sales.month >= 4 and sales.month < 7
group by prod, cust
order by prod, cust
), q3 as(
select prod, cust, sum(quant) as Q3_TOT
from sales
where sales.month >= 7 and sales.month < 10
group by prod, cust
order by prod, cust
), q4 as(
select prod, cust, sum(quant) as Q4_TOT
from sales
where sales.month >= 10
group by prod, cust
order by prod, cust),
avg_q as(
select prod, cust, avg(quant) as AVERAGE
from sales
group by prod, cust
order by prod, cust
), sum_q as (
select prod, cust, sum(quant) as TOTAL
from sales
group by prod, cust
order by prod, cust
), counts_q as (
select prod, cust, count(quant) as COUNT
from sales
group by prod, cust
order by prod, cust
)

select q1.prod, q1.cust, q1.Q1_TOT, q2.Q2_TOT, q3.Q3_TOT, q4.Q4_TOT, avg_q.AVERAGE, sum_q.TOTAL, counts_q.COUNT
from q1
left join q2 
on q1.prod = q2.prod and q1.cust = q2.cust
left join q3 
on q2.prod = q3.prod and q2.cust = q3.cust
left join q4 
on q3.prod = q4.prod and q3.cust = q4.cust
left join avg_q
on q4.prod = avg_q.prod and q4.cust = avg_q.cust
left join sum_q
on avg_q.prod = sum_q.prod and avg_q.cust = sum_q.cust
left join counts_q
on sum_q.prod = counts_q.prod and sum_q.cust = counts_q.cust
